'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.gitlogToChangelog = gitlogToChangelog;
exports.gitlogToList = gitlogToList;
exports.gitsubjectToPRnumber = gitsubjectToPRnumber;
exports.findByType = findByType;
exports.logInfoToMarkdown = logInfoToMarkdown;
function gitlogToChangelog(gitlog) {
    var list = gitlogToList(gitlog);

    var types = ['New: ', 'Fix: ', 'Build: ', 'Doc: '];
    types.forEach(function (type) {
        var outputList = findByType(list, type).map(function (item) {
            return logInfoToMarkdown(item);
        });
        if (outputList.length) {
            console.log('## ' + type);
            outputList.forEach(function (item) {
                console.log(item);
            });
        }
    });
}

function gitlogToList(gitlog) {
    var logs = gitlog.split('\n');
    return logs.map(function (log) {
        var logArray = log.split(',,');
        return { prNum: gitsubjectToPRnumber(logArray[0]), prTitle: logArray[1] };
    });
}

function gitsubjectToPRnumber(subject) {
    return (/#[0-9]+/.exec(subject)[0]
    );
}

function findByType(list, type) {
    return list.filter(function (item) {
        return item['prTitle'].startsWith(type);
    });
}

function logInfoToMarkdown(logInfo) {
    return '- [' + logInfo['prTitle'] + '](' + logInfo['prNum'] + ')';
}