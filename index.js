const core = require('@actions/core');
const github = require('@actions/github');
const label_approved = require('./plugins/label_approved').default

async function run() {
  try {
    const myToken = core.getInput('myToken');
    const octokit = github.getOctokit(myToken);
    const context = github.context;
    const labelerTrigger = core.getInput('labelerTrigger') === 'true';

    if (labelerTrigger) {
      const numberOfApproves = parseInt(core.getInput('labelerApproves'));
      await label_approved(octokit, context, numberOfApproves);
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run();
