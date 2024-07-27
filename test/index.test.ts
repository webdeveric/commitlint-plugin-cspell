import { describe, expect, it } from 'vitest';

import plugin from '../src/index.js';
import { properties } from '../src/types.js';

describe('default export', () => {
  it('Is a Plugin with cspell rules', () => {
    expect(Object.keys(plugin.rules)).toEqual(
      expect.arrayContaining(properties.map((property) => expect.stringMatching(`cspell/${property}`))),
    );
  });
});
