const VERSION_REGEX = /^v(\d+)\.(\d+)\.(\d+)(?:-.+)?$/;
const STABLE_VERSION_REGEX = /^v(\d+)\.(\d+)\.(\d+)$/;

function parseVersion(tag) {
  const match = tag.match(VERSION_REGEX);
  if (!match) {
    throw new Error(`Invalid release tag: ${tag}`);
  }

  return match.slice(1).map(Number);
}

function compareVersion(a, b) {
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
  return 0;
}

function getStableVersion(tag) {
  const match = tag.match(STABLE_VERSION_REGEX);
  return match ? match.slice(1).map(Number) : null;
}

async function getPreviousStableTag({ github, context, tag }) {
  const current = parseVersion(tag);
  const tags = await github.paginate(github.rest.repos.listTags, {
    owner: context.repo.owner,
    repo: context.repo.repo,
    per_page: 100
  });

  return tags
    .map(({ name }) => {
      const version = getStableVersion(name);
      return version ? { name, version } : null;
    })
    .filter(Boolean)
    .filter(({ name, version }) => name !== tag && compareVersion(version, current) < 0)
    .sort((a, b) => compareVersion(b.version, a.version))[0]?.name;
}

async function generateReleaseNotes({ github, context, core, tag, previousStableTag }) {
  const payload = {
    owner: context.repo.owner,
    repo: context.repo.repo,
    tag_name: tag
  };

  if (previousStableTag) {
    payload.previous_tag_name = previousStableTag;
    core.notice(`Generating GitHub Release notes for ${tag} from previous stable tag ${previousStableTag}`);
  } else {
    core.warning(`No previous stable tag found for ${tag}; GitHub will generate release notes without previous_tag_name`);
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
  const previousStableTag = await getPreviousStableTag({ github, context, tag });
  const body = await generateReleaseNotes({ github, context, core, tag, previousStableTag });
  await upsertRelease({ github, context, core, tag, isStable, body });
};
