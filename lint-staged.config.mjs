/**
 * @type {Record<string, string | string[] | ((files: string[]) => string | string[] | Promise<string | string[]>)>}
 */
export default {
  '*.{js,cjs,mjs,ts,cts,mts}': ['eslint --fix', 'prettier --write'],
  '*.{json,md}': 'prettier --write',
  '*': (files) => [
    `cspell lint --no-progress --no-summary --no-must-find-files ${files.join(' ')}`,
    `sh -c 'echo "${files.join('\n')}" | cspell --show-context stdin'`, // Spell check file names.
  ],
};
