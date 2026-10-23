async function upsertRelease({ github, context, core, tag, isStable, body }) {
  const releasePayload = {
    owner: context.repo.owner,
    repo: context.repo.repo,
    tag_name: tag,
    name: tag,
    prerelease: !isStable,
    body
  }

  try {
    const release = await github.rest.repos.getReleaseByTag({
      owner: context.repo.owner,
      repo: context.repo.repo,
      tag
    })
    await github.rest.repos.updateRelease({
      owner: context.repo.owner,
      repo: context.repo.repo,
      release_id: release.data.id,
      name: tag,
      prerelease: !isStable,
      body
    })
    core.notice(`Updated GitHub Release for ${tag}`)
  } catch (error) {
    if (error.status !== 404) throw error
    await github.rest.repos.createRelease(releasePayload)
    core.notice(`Created GitHub Release for ${tag}`)
  }
}

module.exports = async function createGitHubRelease({
  github,
  context,
  core,
  tag,
  isStable,
  body
}) {
  if (!body?.trim()) {
    throw new Error(`Missing release notes for ${tag}`)
  }
  await upsertRelease({ github, context, core, tag, isStable, body })
}
