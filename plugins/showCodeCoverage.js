const core = require('@actions/core');

export const showCodeCoverage = async (octokit, context, coverageReport) => {
    const parsedCoverageReport = parseCoverageReport(coverageReport);
    core.info(parsedCoverageReport);
    // createComment(octokit, context, parsedCoverageReport)
}

const parseCoverageReport = (coverageReport) => {
    coverageReport = "{ " + coverageReport + " }";
    const parsedCoverageReport = JSON.parse(coverageReport);
    const statementsJson = parsedCoverageReport.total.statements;
    const branchesJson = parsedCoverageReport.total.branches;
    const functionsJson = parsedCoverageReport.total.functions;
    const linesJson = parsedCoverageReport.total.lines;
    const statements = "Statements: " + statementsJson.pct + "% " + "(" + statementsJson.covered + "/" + statementsJson.total + ")";
    const branches = "Branches: " + branchesJson.pct + "% " + "(" + branchesJson.covered + "/" + branchesJson.total + ")";
    const functions = "Functions: " + functionsJson.pct + "% " + "(" + functionsJson.covered + "/" + functionsJson.total + ")";
    const lines = "Lines: " + linesJson.pct + "% " + "(" + linesJson.covered + "/" + linesJson.total + ")";
    const topLine = "============== CODE COVERAGE ==============";
    const bottomLine = "===========================================";
    return [topLine, statements, branches, functions, lines, bottomLine]
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