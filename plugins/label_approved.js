const core = require('@actions/core');

export const loglistReviews = async (octokit, context) => {
    const { data: result } = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews', {
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: context.issue.number
    })
    const parsedReviews = parseReviews(result)
    core.info(JSON.stringify(parsedReviews));
}

const parseReviews = (json_input) => {
    list_of_reviews = [];
    for (var i = 0; i < json_input.length; i++) {
        const reviewer = json_input[i].user.login;
        const state = json_input[i].state;
        list_of_reviews.push({ reviewer: reviewer, state: state })
    }
    // unique_reviews = Array.from(new Set(list_of_reviews.map(({ reviewer }) => reviewer)));
    // return unique_reviews
    return list_of_reviews
}

export default loglistReviews