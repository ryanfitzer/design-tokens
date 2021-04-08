# Design Tokens

This project contains design tokens for each Tapestry brand and publishes assets derived from these tokens to a CDN (Akamai), as well as an NPM package to the Github Packages registry.

Each brand's token documentation can be viewed at:

- Coach: https://assets.tapestry.com/ux/design-tokens/coach/index.html
- Kate Spade: https://assets.tapestry.com/ux/design-tokens/kate-spade/index.html
- Stuart Weitzman: https://assets.tapestry.com/ux/design-tokens/stuart-weitzman/index.html

## Assets

Each brand contains the same files. Directory/file naming convention uses [kebab-case](<https://en.wikipedia.org/wiki/Naming_convention_(programming)#Delimiter-separated_words>).

```
└── <brand>
    ├── font-face.css
    ├── _variables.scss
    ├── variables.css
    ├── utilities.css
    └── properties
        ├── index.json
        ├── color.json
        ├── font-family.json
        ├── font-size.json
        ├── letter-spacing.json
        ├── line-height.json
        └── ...
```

### CSS

- Custom properties
- `@font-face` rules
- Utility classes: classes for applying tokens values to your HTML.

#### Utility Classes

Included in each brand's assets is a tiny `utilities.css` (<1K minified/gzipped) that uses [tailwindcss](https://tailwindcss.com/docs) to generate utility classes based on the available tokens. These utilities are **limited** to the following [core plugins](https://tailwindcss.com/docs/configuration#core-plugins):

| Core Plugin       | Class Prefix      | Example Class     |
| ----------------- | ----------------- | ----------------- |
| `backgroundColor` | `bg-[color]`      | `bg-primary`      |
| `borderColor`     | `border-[color]`  | `border-primary`  |
| `textColor`       | `text-[color]`    | `text-primary`    |
| `fontFamily`      | `font-[family]`   | `font-sans-serif` |
| `fontSize`        | `text-[px]`       | `text-16`         |
| `letterSpacing`   | `tracking-[size]` | `tracking-xl`     |
| `lineHeight`      | `leading-[size]`  | `leading-xs`      |

### SCSS

- Variables (same as CSS)

### JSON

- Metadata for every token. Useful for generating documentation ([example](https://assets.tapestry.com/ux/design-tokens/stuart-weitzman/index.html)).

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

### CDN

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

## Development

Development within this codebase requires experience with the following tools:

- [Style Dictionary](https://amzn.github.io/style-dictionary/): Build system for design tokens.
- [PostCSS](https://postcss.org/): A tool for transforming CSS.
- [tailwindcss](https://tailwindcss.com/docs): Customizable CSS utility framework.
- [Handlebars](https://handlebarsjs.com/): HTML templating.
- [semantic-release](https://semantic-release.gitbook.io/semantic-release/): Automated version management and package publishing.
- [GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/introduction-to-github-actions): GitHub's CI/CD automation tool.

### NPM Commands

- `npm run build`: Creates the needed files for the npm package.
- `npm run cdn`: Creates the needed files for CDN distribution. Depends on `npm run build`.

### Tokens

This is the core of this codebase, a collection of JSON files that organize each brand's styles into a semantic hierarchy. Everything one needs to know can be found in Style Dictionary's [documentation](https://amzn.github.io/style-dictionary/#/README).

### Publishing

The release process is managed by [Semantic Release](https://semantic-release.gitbook.io/semantic-release/). New releases are published based on the `<Type>` tag in the commit messages when a the `main` branch receives a push/merge. See `release.config.js` for configuration.

#### Commit Message Conventions

This project adheres to the [ESLint commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-eslint#readme).

Commit message format: `<Tag>: <Message>`

Example commit message:

```
Breaking: Removed deprecated token.
```

Each commit message is linted with [`commitlint`](https://commitlint.js.org). See `commitlint.config.js` for configuration.
