const RELEASE_TAG_REGEX =
  /^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;
const NUMERIC_IDENTIFIER_REGEX = /^(0|[1-9]\d*)$/;
const STABLE_RELEASE = 'stable';
const PRERELEASE = 'prerelease';

function parsePrereleaseIdentifier(value) {
  const numericText = /^\d+$/.test(value);
  if (numericText && !NUMERIC_IDENTIFIER_REGEX.test(value)) return null;

  return {
    value,
    isNumeric: numericText
  };
}

function parseReleaseTag(tag) {
  const match = tag.match(RELEASE_TAG_REGEX);
  if (!match) return null;

  const prerelease = match[4]
    ? match[4].split('.').map(parsePrereleaseIdentifier)
    : [];
  if (prerelease.some((identifier) => !identifier)) return null;

  return {
    core: match.slice(1, 4).map(Number),
    prerelease,
    type: prerelease.length > 0 ? PRERELEASE : STABLE_RELEASE
  };
}

function requireReleaseTag(tag) {
  const version = parseReleaseTag(tag);
  if (!version) {
    throw new Error(`Invalid release tag: ${tag}`);
  }
  return version;
}

function compareCoreVersion(a, b) {
  for (let i = 0; i < 3; i++) {
    if (a.core[i] !== b.core[i]) return a.core[i] - b.core[i];
  }
  return 0;
}

function comparePrereleaseIdentifier(a, b) {
  if (a.isNumeric && b.isNumeric) {
    if (a.value.length !== b.value.length) return a.value.length - b.value.length;
    return a.value === b.value ? 0 : a.value < b.value ? -1 : 1;
  }
  if (a.isNumeric) return -1;
  if (b.isNumeric) return 1;
  return a.value === b.value ? 0 : a.value < b.value ? -1 : 1;
}

function compareVersion(a, b) {
  const coreResult = compareCoreVersion(a, b);
  if (coreResult !== 0) return coreResult;
  if (a.type === STABLE_RELEASE && b.type === STABLE_RELEASE) return 0;
  if (a.type === STABLE_RELEASE) return 1;
  if (b.type === STABLE_RELEASE) return -1;

  const length = Math.max(a.prerelease.length, b.prerelease.length);
  for (let i = 0; i < length; i++) {
    if (a.prerelease[i] === undefined) return -1;
    if (b.prerelease[i] === undefined) return 1;
    const result = comparePrereleaseIdentifier(a.prerelease[i], b.prerelease[i]);
    if (result !== 0) return result;
  }
  return 0;
}

function toReleaseTag(name) {
  const version = parseReleaseTag(name);
  return version ? { name, version } : null;
}

function findPreviousReleaseTag(tagRefs, tag, isStable) {
  const current = requireReleaseTag(tag);
  return tagRefs
    .map(({ name }) => toReleaseTag(name))
    .filter(Boolean)
    .filter(({ version }) => !isStable || version.type === STABLE_RELEASE)
    .filter(({ name, version }) => name !== tag && compareVersion(version, current) < 0)
    .sort((a, b) => compareVersion(b.version, a.version))[0]?.name;
}

async function getPreviousReleaseTag({ github, context, tag, isStable }) {
  const tags = await github.paginate(github.rest.repos.listTags, {
    owner: context.repo.owner,
    repo: context.repo.repo,
    per_page: 100
  });

  return findPreviousReleaseTag(tags, tag, isStable);
}

async function generateReleaseNotes({ github, context, core, tag, previousTag }) {
  const payload = {
    owner: context.repo.owner,
    repo: context.repo.repo,
    tag_name: tag
  };

  if (previousTag) {
    payload.previous_tag_name = previousTag;
    core.notice(`Generating GitHub Release notes for ${tag} from previous tag ${previousTag}`);
  } else {
    core.warning(`No previous tag found for ${tag}; GitHub will generate release notes without previous_tag_name`);
  }

  const notes = await github.rest.repos.generateReleaseNotes(payload);
  return notes.data.body;
}

async function upsertRelease({ github, context, core, tag, isStable, body }) {
  const releasePayload = {
    owner: context.repo.owner,
    repo: context.repo.repo,
    tag_name: tag,
    name: tag,
    prerelease: !isStable,
    body
  };

  try {
    const release = await github.rest.repos.getReleaseByTag({
      owner: context.repo.owner,
      repo: context.repo.repo,
      tag
    });
    await github.rest.repos.updateRelease({
      owner: context.repo.owner,
      repo: context.repo.repo,
      release_id: release.data.id,
      name: tag,
      prerelease: !isStable,
      body
    });
    core.notice(`Updated GitHub Release for ${tag}`);
  } catch (error) {
    if (error.status !== 404) throw error;
    await github.rest.repos.createRelease(releasePayload);
    core.notice(`Created GitHub Release for ${tag}`);
  }
}

module.exports = async function createGitHubRelease({ github, context, core, tag, isStable }) {
  const previousTag = await getPreviousReleaseTag({ github, context, tag, isStable });
  const body = await generateReleaseNotes({ github, context, core, tag, previousTag });
  await upsertRelease({ github, context, core, tag, isStable, body });
};
