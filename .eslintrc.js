module.exports = {
    "parser": "babel-eslint",
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
