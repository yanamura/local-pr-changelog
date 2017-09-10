#!/usr/bin/env node

import {gitlogToChangelog} from './gitlogToChangelog';

const shell = require('shelljs');
const program = require('commander');

program
    .version('0.1.0')
    .option('-c, --checkbox', 'add checkbox')
    .option('-f, --from [value]', 'from Tag')
    //TODO: .option('-t, --to [value]', 'to Tag')
    .parse(process.argv);

shell.exec('git fetch');
shell.exec(`git log ${program.from}..HEAD --merges --first-parent --reverse --pretty=format:"%s,,%b"`, (code, stdout, stderr) => {
    if (!stderr) {
        gitlogToChangelog(stdout, program.checkbox);
    }
});
