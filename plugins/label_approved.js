const core = require('@actions/core');

export const loglistReviews = async (octokit, context) => {

    const { data: result } = await octokit.pulls.get({
        owner: 'pronos-eu',
        repo: context.repo.repo,
        pull_number: context.issue.number
    })
    core.info(JSON.stringify(result));
}

export default loglistReviews