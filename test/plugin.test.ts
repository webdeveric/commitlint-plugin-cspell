import lint from '@commitlint/lint';
import { describe, expect, it } from 'vitest';

import cspellPlugin from '../src/index.js';

import type { CspellRuleName, PluginRulesConfig } from '../src/types.js';
import type { QualifiedRules } from '@commitlint/types';

// cspell:ignore speling

describe('Plugin works with commitlint', () => {
  const rules = {
    'cspell/type': [2, 'always'],
    'cspell/scope': [2, 'always'],
    'cspell/subject': [2, 'always'],
    'cspell/header': [2, 'always'],
    'cspell/body': [2, 'always'],
    'cspell/footer': [2, 'always'],
  } satisfies Partial<PluginRulesConfig>;

  const getRules = (...keys: (keyof PluginRulesConfig)[]): Partial<QualifiedRules> =>
    Object.fromEntries(keys.map((key) => [key, rules[key]]));

  it.each([
    ['cspell/type', 'speling: Bad type'],
    ['cspell/scope', 'chore(speling): Bad scope'],
    ['cspell/subject', 'chore: Bad subject speling'],
    ['cspell/header', 'Bad header speling'],
    ['cspell/body', 'chore(scope): subject\nBad body speling'],
    ['cspell/footer', 'chore(scope): subject\nBody\nBREAKING CHANGE: Bad footer speling'],
  ] satisfies [rule: CspellRuleName, message: string][])('uses %s rule to lint %j', async (rule, message) => {
    const { valid, errors } = await lint(message, getRules(rule), {
      plugins: {
        cspell: cspellPlugin,
      },
    });

    expect(valid).toBe(false);
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: expect.stringContaining('speling'),
        }),
      ]),
    );
  });
});
