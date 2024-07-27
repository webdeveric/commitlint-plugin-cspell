// cSpell:ignore Speling
import { describe, expect, it } from 'vitest';

import { checkSpelling, makeMessage, makeRule } from '../src/utils.js';

import type { Commit } from '../src/types.js';

describe('checkSpelling()', () => {
  it('Returns spelling issues', async () => {
    await expect(checkSpelling('Speling')).resolves.toEqual([
      expect.objectContaining({
        text: 'Speling',
      }),
    ]);

    await expect(checkSpelling(null)).resolves.toHaveLength(0);
    await expect(checkSpelling(undefined)).resolves.toHaveLength(0);
  });
});

describe('makeMessage()', () => {
  it('Returns an error message or undefined', () => {
    expect(makeMessage('subject', [])).toBeUndefined();

    expect(
      makeMessage('subject', [
        {
          isFlagged: false,
          isFound: false,
          length: 7,
          line: {
            offset: 0,
            text: 'Speling',
          },
          offset: 0,
          text: 'Speling',
        },
      ]),
    ).toEqual(expect.stringContaining('Speling'));
  });
});

describe('makeRule()', () => {
  it('Returns a commitlint rule function', async () => {
    const ruleFn = makeRule('subject');

    expect(ruleFn).instanceOf(Function);

    await expect(
      ruleFn({
        merge: 'merge',
        header: 'header',
        body: 'body',
        footer: 'footer',
        revert: null,
        scope: 'testing',
        subject: 'subject',
        notes: [],
        references: [],
        mentions: [],
      } as unknown as Commit),
    ).resolves.toEqual([true, undefined]);

    await expect(
      ruleFn({
        merge: 'merge',
        header: 'header',
        body: 'body',
        footer: 'footer',
        revert: null,
        scope: 'testing',
        subject: 'Speling',
        notes: [],
        references: [],
        mentions: [],
      } as unknown as Commit),
    ).resolves.toEqual([false, expect.stringContaining('Speling')]);
  });
});
