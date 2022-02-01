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
        addLabelToPullRequest(octokit, context);
    } else {
        removeLabelFromPullRequest(octokit, context);
    }
    core.info(JSON.stringify(parsedReviews));
}

const parseReviews = (jsonInput) => {
    const reviews = {};
    for (var i = 0; i < jsonInput.length; i++) {
        const reviewer = jsonInput[i].user.login;
        const state = jsonInput[i].state;
        const timestamp = jsonInput[i].submitted_at;

        reviews[reviewer] = { state, timestamp }
    }
    return reviews
}

const shouldBeLabeled = (reviewers, numberOfApproves) => {
    return Object.values(reviewers).filter(item => item.state == "APPROVED").length >= numberOfApproves;
}

const addLabelToPullRequest = async (octokit, context) => {
    const { data: result } = await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/labels', {
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        labels: ["approved"]
    })
    core.info(JSON.stringify(result))
}

const removeLabelFromPullRequest = async (octokit, context) => {
    try {
        await octokit.request('DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}', {
            owner: context.repo.owner,
            repo: context.repo.repo,
            issue_number: context.issue.number,
            name: "approved"
        })
    } catch (error) {
        if (error.message.includes("Label does not exist")) {
            core.info("ERROR: ")
            core.info(error)
        }
    }
    core.info(JSON.stringify(result))
}
export default labelApprovedPullRequests