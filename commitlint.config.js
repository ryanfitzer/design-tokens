// https://commitlint.js.org/#/reference-configuration
module.exports = {
    parserPreset: 'conventional-changelog-conventionalcommits',
    // https://commitlint.js.org/#/reference-rules?id=rules
    /*
        Example commit message structure:
        <Type>: <This is the subject.>
        Docs: Updated the readme to add more detail.
    */
    rules: {
        'subject-empty': [ 2, 'never' ],
        'type-case': [ 2, 'always', 'start-case' ],
        'type-empty': [ 2, 'never' ],
        'type-enum': [ 2, 'always', [
            'Breaking',
            'Build',
            'Chore',
            'Docs',
            'Fix',
            'New',
            'Update',
            'Upgrade',
            'WIP'
        ] ]
    }
};
