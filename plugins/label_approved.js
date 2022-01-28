export const githubListReviews = await octokit.rest.pulls.listReviews({
    ...context.owner,
    ...context.repo,
    ...context.pull_number,
});

export const loglistReviews = () => {
    core.info(githubListReviews());
}

export default loglistReviews