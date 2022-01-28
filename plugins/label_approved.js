const core = require('@actions/core');

export const loglistReviews = async (octokit, context) => {
    core.info(JSON.stringify({ owner: context.repo.owner, repo: context.repo.repo, pull: context.issue.number }))
    // const result = await octokit.rest.pulls.listReviews({
    //     ...context.repo.owner,
    //     ...context.repo.repo,
    //     ...context.issue.number,
    // })
    const newIssue = await octokit.rest.issues.create({
        ...context.repo,
        title: 'New issue!',
        body: 'Hello Universe!'
    });
    core.info(result);
}

const { data: pullRequest } = await octokit.rest.pulls.get({
    owner: 'octokit',
    repo: 'rest.js',
    pull_number: 123,
    mediaType: {
        format: 'diff'
    }
});

console.log(pullRequest);

export default loglistReviews