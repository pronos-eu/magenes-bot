export const loglistReviews = async (octokit, context) => {
    core.info(context)
    const result = await octokit.rest.pulls.listReviews({
        ...context.owner,
        ...context.repo,
        ...context.pull_number,
    })
    core.info(result);
}

export default loglistReviews