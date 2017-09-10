#!/usr/bin/env node
'use strict';

var _gitlogToChangelog = require('./gitlogToChangelog');

var shell = require('shelljs');
var program = require('commander');

program.version('0.1.0').option('-f, --from [value]', 'from Tag')
//TODO: .option('-t, --to [value]', 'to Tag')
.parse(process.argv);

shell.exec('git fetch');
shell.exec('git log ' + program.from + '..HEAD --merges --first-parent --reverse --pretty=format:"%s,,%b"', function (code, stdout, stderr) {
    if (!stderr) {
        var changelog = (0, _gitlogToChangelog.gitlogToChangelog)(stdout);
        if (changelog) {
            console.log(changelog);
        } else {
            console.log('no Pull Request Merge Logs');
        }
    }
});