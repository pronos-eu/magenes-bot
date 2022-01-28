const core = require('@actions/core');
const github = require('@actions/github');
const label_approved = require('plugins/label_approved').default

async function run() {
  try {
    const myToken = core.getInput('githubToken');
    const context = github.context;
    label_approved();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
