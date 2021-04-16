const { readFileSync } = require('fs-extra');
const { paths } = require('./constants');

module.exports = {
    // dryRun: true,
    branches: ['main'],
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'eslint',
                releaseRules: [
                    { tag: 'Breaking', release: 'major' },
                    { tag: 'New', release: 'minor' },
                    { tag: 'Update', release: 'minor' },
                    { tag: 'Fix', release: 'patch' },
                ],
            },
        ],
        [
            '@semantic-release/release-notes-generator',
            {
                preset: 'eslint',
                parserOpts: {
                    noteKeywords: ['Breaking'],
                },
                writerOpts: {
                    debug: (args) => console.log(args),
                    groupBy: false,
                    headerPartial: readFileSync(
                        `${paths.scripts.changelog}header.hbs`,
                        'utf8'
                    ),
                    commitPartial: readFileSync(
                        `${paths.scripts.changelog}commit.hbs`,
                        'utf8'
                    ),
                },
            },
        ],
        [
            '@semantic-release/changelog',
            {
                changelogTitle: '# Changelog | Tapestry Design Tokens',
                changelogFile: './build/CHANGELOG.md',
            },
        ],
        [
            '@semantic-release/changelog',
            {
                changelogTitle: '# Changelog | Tapestry Design Tokens',
                changelogFile: 'CHANGELOG.md',
            },
        ],
        [
            '@semantic-release/npm',
            {
                pkgRoot: './build',
            },
        ],
        [
            '@semantic-release/git',
            {
                assets: ['CHANGELOG.md'],
                message: 'Chore: Release v${nextRelease.version} [skip ci]',
            },
        ],
    ],
};
