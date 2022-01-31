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
      const json_input = await label_approved(octokit, context);
      list_of_reviews = []
      for (var i = 0; i < json_input.length; i++) {
        const reviewer = json_input[i].user.login;
        const state = json_input[i].state;
        list_of_reviews.push({ [reviewer]: state })
      }
      const unique_reviews = [...new Set(list_of_reviews.map(item => item.reviewer))];
      core.info(unique_reviews)

    }
  } catch (error) {
    core.setFailed(JSON.stringify(error));
  }
}

run();
