import {gitlogToChangelog, gitlogToList, gitsubjectToPRnumber, findByType, logInfoToMarkdown, findNoType} from '../gitlogToChangelog';

const gitlog = "Merge pull request #893 from existentialism/issue890,,New: Add DraftEditorDefaultProps type\n" +
    "Merge pull request #905 from marcelometal/marcelometal-patch-1,,Update: Improve README.md\n" +
    "Merge pull request #1026 from Daniel15/draftjsorg-updates,,Update: Updates to move the site to draftjs.org\n" +
    "Merge pull request #1028 from flarnie/tweakToFixWebsiteBuild,,New: Add .gitkeep to /website/src/lib\n" +
    "Merge pull request #1030 from Daniel15/oh-my-glob,,Docs: Only include files in glob, not directory.\n" +
    "Merge pull request #1032 from TestUser1/fix-test,,Test Commit.\n" +
    "Merge pull request #1031 from Daniel15/fix-web,,Fix: Fix race condition in website builder script";
const logInfo = [
    {prNum: "#893", prTitle: "New: Add DraftEditorDefaultProps type"},
    {prNum: "#905", prTitle: "Update: Improve README.md"},
    {prNum: "#1026", prTitle: "Update: Updates to move the site to draftjs.org"},
    {prNum: "#1028", prTitle: "New: Add .gitkeep to /website/src/lib"},
    {prNum: "#1030", prTitle: "Docs: Only include files in glob, not directory."},
    {prNum: "#1032", prTitle: "Test Commit."},
    {prNum: "#1031", prTitle: "Fix: Fix race condition in website builder script"}
];

describe('gitsubjectToPRnumber', () => {
    it('should return PullRequest number', () => {
        const subject = "Merge pull request #893 from existentialism/issue890";

        const prNumber = gitsubjectToPRnumber(subject)

        expect(prNumber).toBe('#893');
    });
});

describe('gitlogToList', () => {
    it('should return logInfo', () => {
        expect(gitlogToList(gitlog)).toEqual(logInfo);
    });
});

describe('findByType', () => {
    it('should return logInfo which contains type', () => {
        expect(findByType(logInfo, 'New: ')).toEqual([
            {prNum: "#893", prTitle: "New: Add DraftEditorDefaultProps type"},
            {prNum: "#1028", prTitle: "New: Add .gitkeep to /website/src/lib"},
        ]);
    });
});

describe('findNoType', () => {
    it('should return logInfo which not contains type', () => {
        expect(findNoType(logInfo, ['New: ', 'Update: ', 'Fix: ', 'Docs: '])).toEqual([
            {prNum: "#1032", prTitle: "Test Commit."},
        ]);
    });
});

describe('logInfoToMarkdown', () => {
    describe('with checkbox', () => {
        it('should return markdown', () => {
            expect(logInfoToMarkdown({prNum: "#893", prTitle: "New: Add DraftEditorDefaultProps type"}, true)).toBe('- [ ] [New: Add DraftEditorDefaultProps type](#893)')
        });
    });

    describe('without checkbox', () => {
        it('should return markdown', () => {
            expect(logInfoToMarkdown({prNum: "#893", prTitle: "New: Add DraftEditorDefaultProps type"}, false)).toBe('- [New: Add DraftEditorDefaultProps type](#893)')
        });
    });
});