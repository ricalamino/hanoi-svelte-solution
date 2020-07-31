module.exports = {
    "parserOptions": {
        "ecmaVersion": 2019,
        "sourceType": "module"
      },
      "env": {
        "es6": true,
        "browser": true
      },
      "plugins": [
        "svelte3"
      ],
      "overrides": [
        {
          "files": ["*.svelte"],
          "processor": "svelte3/svelte3"
        }
      ],
      "rules": {
        "semi": [2, "always"],
        "indent": [2, 2],
        "quotes": ["error", "single"]
      },
      "settings": {
        // ...
      }
}