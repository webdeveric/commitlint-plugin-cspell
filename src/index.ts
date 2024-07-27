import { properties, type PluginRuleEntry } from './types.js';
import { makeRule } from './utils.js';

import type { Plugin } from '@commitlint/types';

const ruleEntries: PluginRuleEntry[] = properties.map((property) => {
  return [`cspell/${property}`, makeRule(property)];
});

const plugin: Plugin = {
  rules: Object.fromEntries(ruleEntries),
};

export default plugin;
