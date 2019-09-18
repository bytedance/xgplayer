module.exports = {
    "parser": "babel-eslint",
    "extends": "standard",
    "rules": {
<<<<<<< HEAD
        "semi": 0
    }
=======
        "semi": 2
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
>>>>>>> 0443b761c2626ee9010e041f0c998c78b8c85f1a
};
