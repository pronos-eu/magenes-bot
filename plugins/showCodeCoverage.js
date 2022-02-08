const core = require('@actions/core');

export const showCodeCoverage = async (octokit, context, coverageReport) => {
    core.info(coverageReport);
    createComment(octokit, context, coverageReport)
}

const createComment = async (octokit, context, coverageReport) => {
    try {
        await octokit.request('POST /repos/{owner}/{repo}/issues/{pull_number}/comments', {
            owner: context.repo.owner,
            repo: context.repo.repo,
            pull_number: context.issue.number,
            body: coverageReport[0] + "\n" +
                coverageReport[1] + "\n" +
                coverageReport[2] + "\n" +
                coverageReport[3],
        })
    } catch (error) {
        core.info(error.message)
    }
}
export default showCodeCoverage