# local-pr-changelog.js

A command line Utility to generate Pull Request based changelog from local repository.

Pros: No need to use github api token.
Cons: Plz update local repository yourself. Need to copy and paste changelog manually.

## Usage

### Install
npm
```
npm install -g local-pr-changelog
```

yarn
```
yarn global add local-pr-changelog
```

### Output Changelog

#### output Tag to HEAD 
```
local-pr-changelog -f v1.0.0
```

#### output Tag to HEAD with checkbox
```
local-pr-changelog -f v1.0.0 -c
```

### Classify Output

Pull Request Title must start with `New: ` or `Fix: ` or `Update: ` or `Build: `.





