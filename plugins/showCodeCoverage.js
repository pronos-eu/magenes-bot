const core = require('@actions/core');

export const showCodeCoverage = async (octokit, context, coverageReport) => {
    core.info(coverageReport);
    const parsedCoverageReport = parseCoverageReport(coverageReport);
    // createComment(octokit, context, parsedCoverageReport)
}

const parseCoverageReport = (coverageReport) => {
    core.info(coverageReport);
    parsedCoverageReport = JSON.parse(coverageReport);
}

const createComment = async (octokit, context, coverageReport) => {
    try {
        await octokit.request('POST /repos/{owner}/{repo}/issues/{pull_number}/comments', {
            owner: context.repo.owner,
            repo: context.repo.repo,
            pull_number: context.issue.number,
            body: coverageReport
        })
    } catch (error) {
        core.info(error.message)
    }
}
export default showCodeCoverage