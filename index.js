const core = require('@actions/core');
const github = require('@actions/github');
const label_approved = require('./plugins/label_approved').default

async function run() {
  try {
    const myToken = core.getInput('githubToken');
    const octokit = github.getOctokit(myToken)
    const context = github.context;
    // await label_approved(octokit, context);
    const { data: pullRequest } = await octokit.rest.pulls.get({
      ...context.repo.owner,
      ...context.repo,
      ...context.issue.number,
    });
  } catch (error) {
    core.setFailed(JSON.stringify(error));
  }
}

run();
