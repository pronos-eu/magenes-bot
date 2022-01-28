export const listReviews = await octokit.rest.pulls.listReviews({
    ...context.owner,
    ...context.repo,
    ...context.pull_number,
});

export default listReviews