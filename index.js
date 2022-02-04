const core = require('@actions/core');
const github = require('@actions/github');
const label_approved = require('./plugins/label_approved').default
const show_code_coverage = require('./plugins/show_code_coverage').default

async function run() {
  try {
    const myToken = core.getInput('myToken');
    const octokit = github.getOctokit(myToken);
    const context = github.context;
    const labelerTrigger = core.getInput('labelerTrigger') === 'true';
    const codeCoverageTrigger = core.getInput('codeCoverageTrigger') === 'true';

    if (labelerTrigger) {
      const numberOfApproves = parseInt(core.getInput('labelerApproves'));
      await label_approved(octokit, context, numberOfApproves);
    }

    if (codeCoverageTrigger) {
      const coverageStatements = core.getInput('coverageStatements');
      const coverageBranches = core.getInput('coverageBranches');
      const coverageFunctions = core.getInput('coverageFunctions');
      const coverageLines = core.getInput('coverageLines');
      core.info("COVERAGE REPORT: ")
      const coverageReport = [coverageStatements, coverageBranches, coverageFunctions, coverageLines]
      await show_code_coverage(octokit, context, coverageReport);
    }

  } catch (error) {
    core.setFailed(error.message)
  }
}

run();
