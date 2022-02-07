const core = require('@actions/core');

export const lintModifiedFiles = async (octokit, context) => {
    const modifiedFiles = getModifiedFiles(octokit, context);
    const listOfFiles = parseModifiedFiles(modifiedFiles);
    core.info(listOfFiles)
}

const parseModifiedFiles = (modifiedFiles) => {
    const filenames = {};
    for (var i = 0; i < modifiedFiles.length; i++) {
        const filename = modifiedFiles[i].filename;
        filenames[filename] = { filename }
    }
    return filenames
}

const getModifiedFiles = async (octokit, context) => {
    try {
        const modifiedFiles = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/files', {
            owner: context.repo.owner,
            repo: context.repo.repo,
            pull_number: context.issue.number,
        })
        return modifiedFiles;
    } catch (error) {
        core.info(error.message);
    }
}
export default lintModifiedFiles