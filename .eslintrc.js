module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "commonjs": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/display-name": "off",
        "react/prop-types": "off",
        "react/no-children-prop": "off",
        "semi": [
            "error",
            "always"
        ]
    },
    "globals": {
        "env": true,
        "$": true,
        "axios": true
    },
};
