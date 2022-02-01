const core = require('@actions/core');

export const labelApprovedPullRequests = async (octokit, context, numberOfApproves) => {
    const { data: result } = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews', {
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: context.issue.number
    })
    core.info(JSON.stringify(result));
    const parsedReviews = parseReviews(result);
    if (shouldBeLabeled(parsedReviews, numberOfApproves)) {
        labelPullRequest(octokit, context);
    }
    core.info(JSON.stringify(parsedReviews));
}

const parseReviews = (jsonInput) => {
    const listOfReviews = [];
    for (var i = 0; i < jsonInput.length; i++) {
        const reviewer = jsonInput[i].user.login;
        const state = jsonInput[i].state;
        if (state == "APPROVED" && !listOfReviews.includes(reviewer)) {
            listOfReviews.push(reviewer);
        }
    }
    return listOfReviews
}

const shouldBeLabeled = (reviewers, numberOfApproves) => {
    return reviewers.length > numberOfApproves;
}

const labelPullRequest = async (octokit, context) => {
    const { data: result } = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}/labels', {
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        labels: "approved"
    })
    core.info(JSON.stringify(result))
}
export default labelApprovedPullRequests