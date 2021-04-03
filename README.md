# Design Tokens

This project contains design tokens for each Tapestry brand and publishes assets derived from these tokens to a CDN (Akamai), as well as an NPM package to the Github Packages registry.

## Assets

- CSS: variables (CSS, SCSS)
- CSS: `@font-face` rules
- CSS: A customized version of [Tailwind](https://tailwindcss.com/docs) (see Tailwind section below for more info).
- JSON: data for generating token documentation

Each brand contains the same files. Directory/file naming convention is [kebab-case](<https://en.wikipedia.org/wiki/Naming_convention_(programming)#Delimiter-separated_words>).

```
└── brand-name
    ├── font-face.css
    ├── _variables.scss
    ├── variables.css
    ├── utilities.css
    └── properties
        ├── index.json
        ├── color.json
        ├── font.json
        └── size.json
```

## Usage

### NPM Package

Since this repo currently private, there are special requirements needed in order to install the package from the [Github Packages](https://docs.github.com/en/packages/learn-github-packages/about-github-packages) registry:

- A Github account
- Membership of the repo with `read` permissions
- A [personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with the `read:packages` scope enabled.
- Proper [NPM configuration](https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#installing-a-package)

Once these steps have been completed you can install the package:

```
npm install @tapestry-inc/design-tokens
```

Once installed, you can import the assets as needed. It is expected that your module bundler and/or your CSS processor is configured to import/build CSS assets into your application.

### CDN Assets

All assets are available on a CDN. The current version for each brand is located in the root directory. You can also access a specific version by appending the version number as a directory to the root.

Root URL: https://assets.tapestry.com/ux/design-tokens

URL structure for the current version:

```
<root-url>/<brand>/*
```

URL structure for a specific version:

```
<root-url>/<x.x.x>/<brand>/*
```

#### Tailwind

Included in each brand's assets is a customized version of Tailwind that contains the following [core plugins](https://tailwindcss.com/docs/configuration#core-plugins), which are configured to use the Tapestry core theme instead of Tailwind's defaults:

- `backgroundColor`
- `borderColor`
- `fontFamily`
- `fontSize`
- `letterSpacing`
- `lineHeight`
- `textColor`

This results in a small utility class framework (currently less than 1K when minified and gzipped) that can be used within markup. It is expected that these utility classes will grow and it is recommended that each codebase use [PurgeCSS](https://purgecss.com/) to remove any unused CSS at build time.

## Development

### Frameworks

[ToDo]

### Tokens

[ToDo]

### Build & Release

[ToDo]

### Commit Conventions

This projects requires commit messages use the [ESLint convention](https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-eslint/README.md#eslint-convention)

Commit message format: `<Tag>: <Message>`

Example commit message:

```
Breaking: Removed deprecated token.
```

Each commit message is linted with [`commitlint`](https://commitlint.js.org). See `commitlint.config.js` for configuration.

### Publishing

The release process is managed by [Semantic Release](https://semantic-release.gitbook.io/semantic-release/). New releases are published based on the `<Type>` tag in the commit messages when a the `main` branch receives a push/merge. See `release.config.js` for configuration.
