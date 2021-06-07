module.exports = {
    "parser": "@babel/eslint-parser",
    parserOptions: {
        sourceType: "module",
        allowImportExportEverywhere: false,
        babelOptions: {
            configFile: ".babelrc",
        },
    },
    "extends": "standard",
    "rules": {
        "semi": 0
    },
    "overrides": [
        {
            "files": ["packages/**/**.js"],
            "globals": {
                "fetch": true,
                "Headers": true
            }
        }
    ]
};
