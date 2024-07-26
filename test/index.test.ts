import { describe, expect, it } from 'vitest';

import { demo } from '../src/index.js';

describe('demo()', () => {
  it('Does a thing', () => {
    expect(demo()).toBeTruthy();
  });
});
