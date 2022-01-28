export const loglistReviews = async (octokit) => {
    const result = await octokit.rest.pulls.listReviews({
        ...context.owner,
        ...context.repo,
        ...context.pull_number,
    })
    core.info(result);
}

export default loglistReviews