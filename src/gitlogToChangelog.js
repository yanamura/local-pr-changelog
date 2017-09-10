export function gitlogToChangelog(gitlog, withCheckbox) {
    console.log(`\n\n ==================================================\n\n`);

    if (!gitlog) {
        console.log('no Pull Request Merge Logs');
        return;
    }

    const list = gitlogToList(gitlog);

    const types = ['New: ', 'Fix: ', 'Build: ', 'Doc: '];
    types.forEach(type => {
        const outputList = findByType(list, type).map((item) => {return logInfoToMarkdown(item, withCheckbox)});
        if (outputList.length) {
            console.log(`## ${type}`);
            outputList.forEach((item) => {
                console.log(item);
            });
        }
    });

    const noTypeList = findNoType(list, types).map((item) => {return logInfoToMarkdown(item, withCheckbox)});
    if (noTypeList.length) {
        console.log(`## Others`);
        noTypeList.forEach((item) => {
            console.log(item);
        });
    }
}

export function gitlogToList(gitlog) {
    const logs = gitlog.split('\n');
    return logs.map((log) => {
        const logArray = log.split(',,');
        return {prNum: gitsubjectToPRnumber(logArray[0]), prTitle: logArray[1]}
    })
}

export function gitsubjectToPRnumber(subject) {
    return /#[0-9]+/.exec(subject)[0];
}

export function findByType(list, type) {
    return list.filter((item) => {
        return item['prTitle'].startsWith(type);
    });
}

export function findNoType(list, types) {
    return list.filter((item) => {
        for (let i = 0; i < types.length; i++) {
            if (item['prTitle'].startsWith(types[i])) {
                return false;
            }
        }
        return true;
    });
}

export function logInfoToMarkdown(logInfo, withCheckbox) {
    if (withCheckbox) {
        return `- [ ] [${logInfo['prTitle']}](${logInfo['prNum']})`;
    } else {
        return `- [${logInfo['prTitle']}](${logInfo['prNum']})`;
    }
}