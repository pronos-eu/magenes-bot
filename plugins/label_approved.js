const core = require('@actions/core');

export const loglistReviews = async (octokit, context) => {
    const { data: result } = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews', {
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: context.issue.number
    })
    return result
    // core.info(JSON.stringify(result));
    core.info(JSON.stringify(parseReviews(result)));
}

const parseReviews = (json_input) => {
    list_of_reviews = []
    for (var i = 0; i < json_input.length; i++) {
        const reviewer = json_input[i].user.login;
        const state = json_input[i].state;
        list_of_reviews.push({ [reviewer]: state })
    }
    // const unique_reviews = [...new Set(list_of_reviews.map(item => item.reviewer))];
    // return unique_reviews
    return list_of_reviews
}

export default loglistReviews