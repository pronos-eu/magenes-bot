const core = require('@actions/core');

export const showCodeCoverage = async (octokit, context, coverageReport) => {
    const parsedCoverageReport = parseCoverageReport(coverageReport);
    // createComment(octokit, context, parsedCoverageReport)
}

const parseCoverageReport = (coverageReport) => {
    coverageReport = "{ " + coverageReport + " }";
    const parsedCoverageReport = JSON.parse(coverageReport);
    core.info(JSON.stringify(parsedCoverageReport));
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