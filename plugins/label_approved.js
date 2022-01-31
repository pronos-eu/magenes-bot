const core = require('@actions/core');

export const loglistReviews = async (octokit, context) => {
    const { data: result } = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews', {
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: context.issue.number
    })
    core.info(JSON.stringify(result));
}

export default loglistReviews