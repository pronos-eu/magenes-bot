const core = require('@actions/core');
const exec = require('@actions/exec');

export const showCodeCoverage = async (octokit, context) => {
    const codeCoverage = await exec.exec('ls');
    core.info(codeCoverage);
}

export default showCodeCoverage