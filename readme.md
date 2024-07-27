# `commitlint-plugin-cspell`

[![Node.js CI](https://github.com/webdeveric/commitlint-plugin-cspell/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdeveric/commitlint-plugin-cspell/actions/workflows/node.js.yml)

## Install

```sh
pnpm add commitlint-plugin-cspell -D
```

## Configure rules

This config shows all the rules provided by this plugin. You must use at least one of them to get spell checking.

:information_source: If you're using conventional commits, you'll probably want to use `cspell/type`, `cspell/scope`, and `cspell/subject` instead of `cspell/header`.

---

Example `commitlint.config.mjs`:

```js
/**
 * @type {import('@commitlint/types').UserConfig}
 */
export default {
  plugins: ['commitlint-plugin-cspell'],
  rules: {
    'cspell/type': [2, 'always'],
    'cspell/scope': [2, 'always'],
    'cspell/subject': [2, 'always'],
    'cspell/header': [2, 'always'],
    'cspell/body': [2, 'always'],
    'cspell/footer': [2, 'always'],
  },
};
```
