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
      owner: context.repo.owner,
      repo: context.repo,
      pull_number: context.issue.number,
    });
  } catch (error) {
    core.setFailed(error);
  }
}

run();
