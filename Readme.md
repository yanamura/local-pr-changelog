# local-pr-changelog.js

A command line Utility to generate Pull Request based changelog from local repository.

## Usage

### Install
npm
```
npm install -D local-pr-changelog
```

yarn
```
yarn add -D local-pr-changelog
```

### Output Changelog

#### output Tag to HEAD 
```
./node_modules/.bin/local-pr-changelog -f v1.0.0
```

#### output Tag to HEAD with checkbox
```
./node_modules/.bin/local-pr-changelog -f v1.0.0 -c
```

### Classify Output

Pull Request Title must start with `New: ` or `Fix: ` or `Update: ` or `Build: `.





