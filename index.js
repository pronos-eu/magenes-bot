const core = require('@actions/core');
const github = require('@actions/github');
const label_approved = require('./plugins/label_approved').default

async function run() {
  try {
    const myToken = core.getInput('myToken');
    const labelerTrigger = core.getInput('labelerTrigger')
    const octokit = github.getOctokit(myToken)
    const context = github.context;
    const testTrigger = false
    // core.info(labelerTrigger)
    core.info(testTrigger)
    if (!!testTrigger) {
      await label_approved(octokit, context);
    }
  } catch (error) {
    core.setFailed(JSON.stringify(error));
  }
}

run();
