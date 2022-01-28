const core = require('@actions/core');
const github = require('@actions/github');
const label_approved = require('plugins/label_approved.js').default

// most @actions toolkit packages have async methods
async function run() {
  try {
    const myToken = core.getInput('myToken');
    const context = github.context;
    label_approved();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
