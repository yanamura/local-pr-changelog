'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.gitlogToChangelog = gitlogToChangelog;
exports.gitlogToList = gitlogToList;
exports.gitsubjectToPRnumber = gitsubjectToPRnumber;
exports.findByType = findByType;
exports.findNoType = findNoType;
exports.logInfoToMarkdown = logInfoToMarkdown;
function gitlogToChangelog(gitlog, withCheckbox) {
    console.log('\n\n ==================================================\n\n');

    if (!gitlog) {
        console.log('no Pull Request Merge Logs');
        return;
    }

    var list = gitlogToList(gitlog);

    var types = ['New: ', 'Fix: ', 'Update: ', 'Build: ', 'Docs: ', 'Upgrade: ', 'Breaking: '];
    types.forEach(function (type) {
        var outputList = findByType(list, type).map(function (item) {
            return logInfoToMarkdown(item, withCheckbox);
        });
        if (outputList.length) {
            console.log('## ' + type.slice(0, -2));
            outputList.forEach(function (item) {
                console.log(item);
            });
        }
    });

    var noTypeList = findNoType(list, types).map(function (item) {
        return logInfoToMarkdown(item, withCheckbox);
    });
    if (noTypeList.length) {
        console.log('## Others');
        noTypeList.forEach(function (item) {
            console.log(item);
        });
    }
}

function gitlogToList(gitlog) {
    var logs = gitlog.split('\n');
    return logs.map(function (log) {
        var logArray = log.split(',,');
        if (!logArray[1]) {
            return null;
        }
        return { prNum: gitsubjectToPRnumber(logArray[0]), prTitle: logArray[1] };
    }).filter(function (log) {
        return log !== null;
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

function findNoType(list, types) {
    return list.filter(function (item) {
        for (var i = 0; i < types.length; i++) {
            if (item['prTitle'].startsWith(types[i])) {
                return false;
            }
        }
        return true;
    });
}

function logInfoToMarkdown(logInfo, withCheckbox) {
    if (withCheckbox) {
        return '- [ ] [' + logInfo['prTitle'] + '](' + logInfo['prNum'] + ')';
    } else {
        return '- [' + logInfo['prTitle'] + '](' + logInfo['prNum'] + ')';
    }
}