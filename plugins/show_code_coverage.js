const core = require('@actions/core');
const exec = require('@actions/exec');

export const showCodeCoverage = async (octokit, context, coverageReport) => {
    core.info(coverageReport);
}

export default showCodeCoverage