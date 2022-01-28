const core = require('@actions/core');

export const loglistReviews = async (octokit, context) => {
    core.info(JSON.stringify({ owner: context.repo.owner, repo: context.repo.repo, pull: context.issue.number }))
    const result = await octokit.pulls.get({
        ...context.repo.owner,
        ...context.repo,
        ...context.issue.number,
    })
    core.info(result);
}

export default loglistReviews