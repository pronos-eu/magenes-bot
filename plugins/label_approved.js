const core = require('@actions/core');

export const loglistReviews = async (octokit, context) => {
    //core.info(JSON.stringify({ owner: context.owner, repo: context.repo, pull: context.pull_number }))
    core.info(JSON.stringify({ owner: context.owner, pull: context.pull_number }))
    const result = await octokit.rest.pulls.listReviews({
        ...context.owner,
        ...context.repo,
        ...context.pull_number,
    })
    core.info(result);
}

export default loglistReviews