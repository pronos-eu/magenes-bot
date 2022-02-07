const core = require('@actions/core');

export const lintModifiedFiles = async (octokit, context) => {
    modifiedFiles = getModifiedFiles(octokit, context);
    // core.info(modifiedFiles);
}

const getModifiedFiles = async (octokit, context) => {
    try {
        const modifiedFiles = await octokit.request('/repos/{owner}/{repo}/pulls/{pull_number}/files', {
            owner: context.repo.owner,
            repo: context.repo.repo,
            pull_number: context.issue.number,
        })
        core.info(modifiedFiles);
        return modifiedFiles;
    } catch (error) {
        core.info(error.message);
    }
}
export default lintModifiedFiles