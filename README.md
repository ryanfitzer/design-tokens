# Tapestry Design Tokens

Design tokens are style primitives (color, typography, spacing, etc.) that are stored in a platform/code/use-agnostic system, enabling greater efficiency in maintaining and scaling a brand's style.

With these tokens, we also generate a customized version of [Tailwind](https://tailwindcss.com/docs). This enables using utility classes encoded with a brand's design tokens for situations where using a utility class is more optimal than using a variable.

## Development

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

### FTP Assets

[ToDo]
