const core = require('@actions/core');
const exec = require('@actions/exec');

export const showCodeCoverage = async (octokit, context, coverageReport) => {
    core.info(coverageReport);
    createComment(octokit, context, coverageReport)
}

const createComment = async (octokit, context, coverageReport) => {
    try {
        await octokit.request('POST /repos/{owner}/{repo}/pulls/{pull_number}/comments', {
            owner: context.repo.owner,
            repo: context.repo.repo,
            pull_number: context.issue.number,
            body: coverageReport[0]
        })
    } catch (error) {
        core.info(error.message)
    }
}
export default showCodeCoverage