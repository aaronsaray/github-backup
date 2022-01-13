const { Octokit } = require("@octokit/rest");
const cliProgress = require('cli-progress');
const { mkdirSync } = require('fs');
const path = require('path');
const { execSync } = require('child_process');

process.env.GHTOKEN || (() => {throw new Error('The GHTOKEN environment variable must be defined.')})();
process.env.FOLDER || (() => {throw new Error('The FOLDER environment variable must be defined.')})();

(async () => {
    const octokit = new Octokit({
        auth: process.env.GHTOKEN
    });

    console.info('Loading up on repos...');

    const repos = await octokit.paginate("GET /user/repos", {
        affiliation: "owner",
        sort: "full_name",
        per_page: 100
    });

    const total = repos.length;

    console.info(`Retrieved all repos - there are ${total} of them.`);

    const rootFolder = path.join(process.env.FOLDER, (new Date()).toISOString().substring(0, 10));

    console.info(`Beginning to write them to folder ${rootFolder}`);

    mkdirSync(rootFolder);

    const progress = new cliProgress.SingleBar({
        format: '[{bar}] {percentage}% | ETA: {eta}s | {value}/{total} | {repo}'
    }, cliProgress.Presets.shades_classic);

    progress.start(total, 0, {
        repo: ""
    });

    let count = 0;

    repos.forEach(repo => {
        execSync(`git clone ${repo.ssh_url} --quiet`, {
            cwd: rootFolder
        });

        progress.update(++count, { repo: repo.full_name });
    });

    progress.stop();

    console.info('We are done!');
})();
