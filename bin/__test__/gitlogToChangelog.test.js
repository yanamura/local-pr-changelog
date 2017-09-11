"use strict";

var _gitlogToChangelog = require("../gitlogToChangelog");

var gitlog = "Merge pull request #893 from existentialism/issue890,,New: Add DraftEditorDefaultProps type\n" + "Merge pull request #905 from marcelometal/marcelometal-patch-1,,Update: Improve README.md\n" + "Merge pull request #1026 from Daniel15/draftjsorg-updates,,Update: Updates to move the site to draftjs.org\n" + "Merge pull request #1028 from flarnie/tweakToFixWebsiteBuild,,New: Add .gitkeep to /website/src/lib\n" + "Merge pull request #1030 from Daniel15/oh-my-glob,,Docs: Only include files in glob, not directory.\n" + "Merge pull request #1032 from TestUser1/fix-test,,Test Commit.\n" + "Merge pull request #1031 from Daniel15/fix-web,,Fix: Fix race condition in website builder script";
var logInfo = [{ prNum: "#893", prTitle: "New: Add DraftEditorDefaultProps type" }, { prNum: "#905", prTitle: "Update: Improve README.md" }, { prNum: "#1026", prTitle: "Update: Updates to move the site to draftjs.org" }, { prNum: "#1028", prTitle: "New: Add .gitkeep to /website/src/lib" }, { prNum: "#1030", prTitle: "Docs: Only include files in glob, not directory." }, { prNum: "#1032", prTitle: "Test Commit." }, { prNum: "#1031", prTitle: "Fix: Fix race condition in website builder script" }];

describe('gitsubjectToPRnumber', function () {
    it('should return PullRequest number', function () {
        var subject = "Merge pull request #893 from existentialism/issue890";

        var prNumber = (0, _gitlogToChangelog.gitsubjectToPRnumber)(subject);

        expect(prNumber).toBe('#893');
    });
});

describe('gitlogToList', function () {
    it('should return logInfo', function () {
        expect((0, _gitlogToChangelog.gitlogToList)(gitlog)).toEqual(logInfo);
    });
});

describe('findByType', function () {
    it('should return logInfo which contains type', function () {
        expect((0, _gitlogToChangelog.findByType)(logInfo, 'New: ')).toEqual([{ prNum: "#893", prTitle: "New: Add DraftEditorDefaultProps type" }, { prNum: "#1028", prTitle: "New: Add .gitkeep to /website/src/lib" }]);
    });
});

describe('findNoType', function () {
    it('should return logInfo which not contains type', function () {
        expect((0, _gitlogToChangelog.findNoType)(logInfo, ['New: ', 'Update: ', 'Fix: ', 'Docs: '])).toEqual([{ prNum: "#1032", prTitle: "Test Commit." }]);
    });
});

describe('logInfoToMarkdown', function () {
    describe('with checkbox', function () {
        it('should return markdown', function () {
            expect((0, _gitlogToChangelog.logInfoToMarkdown)({ prNum: "#893", prTitle: "New: Add DraftEditorDefaultProps type" }, true)).toBe('- [ ] [New: Add DraftEditorDefaultProps type](#893)');
        });
    });

    describe('without checkbox', function () {
        it('should return markdown', function () {
            expect((0, _gitlogToChangelog.logInfoToMarkdown)({ prNum: "#893", prTitle: "New: Add DraftEditorDefaultProps type" }, false)).toBe('- [New: Add DraftEditorDefaultProps type](#893)');
        });
    });
});