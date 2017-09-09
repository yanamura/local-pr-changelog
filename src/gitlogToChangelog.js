export function gitlogToChangelog(gitlog) {
    const list = gitlogToList(gitlog);

    const types = ['New: ', 'Fix: ', 'Build: ', 'Doc: '];
    types.forEach(type => {
        const outputList = findByType(list, type).map((item) => {return logInfoToMarkdown(item)});
        if (outputList.length) {
            console.log(`## ${type}`);
            outputList.forEach((item) => {
                console.log(item);
            });
        }
    });
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

export function logInfoToMarkdown(logInfo) {
    return `- [${logInfo['prTitle']}](${logInfo['prNum']})`
}