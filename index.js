const core = require('@actions/core');
const github = require('@actions/github');
const labelApproved = require('./plugins/labelApproved').default
const showCodeCoverage = require('./plugins/showCodeCoverage').default
const lintCode = require('./plugins/lintCode').default

async function run() {
  try {
    const myToken = core.getInput('myToken');
    const octokit = github.getOctokit(myToken);
    const context = github.context;
    const labelerTrigger = core.getInput('labelerTrigger') === 'true';
    const codeCoverageTrigger = core.getInput('codeCoverageTrigger') === 'true';
    const linterTrigger = core.getInput('linterTrigger') === 'true';

    if (labelerTrigger) {
      const numberOfApproves = parseInt(core.getInput('labelerApproves'));
      await labelApproved(octokit, context, numberOfApproves);
    }

    if (codeCoverageTrigger) {
      const coverageReport = core.getInput('coverageReport');
      await showCodeCoverage(octokit, context, coverageReport);
    }

    if (linterTrigger) {
      await lintCode(octokit, context);
    }

  } catch (error) {
    core.setFailed(error.message)
  }
}

run();
