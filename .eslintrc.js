module.exports = {
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "project": "./tsconfig.eslint.json"
    },
    "ignorePatterns": [
        "features/step_definitions/stepdef.ts",
        ".eslintrc.js",
        "webpack.config.js",
    ],
    "rules": {
        "@typescript-eslint/no-explicit-any": "off",
    }
}
