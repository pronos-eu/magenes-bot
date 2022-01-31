const core = require('@actions/core');
const github = require('@actions/github');
const label_approved = require('./plugins/label_approved').default

async function run() {
  try {
    const myToken = core.getInput('myToken');
    const octokit = github.getOctokit(myToken)
    const context = github.context;
    // await label_approved(octokit, context);
    const { data: pullRequest } = await octokit.rest.pulls.get({
      owner: "pronos-eu",
      ...context.repo,
      ...context.issue.number,
    });
    core.info(pullRequest);
  } catch (error) {
    core.setFailed(JSON.stringify(error));
  }
}

run();
