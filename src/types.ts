import type { Plugin } from '@commitlint/types';
import type { RemoveIndex } from '@webdeveric/utils/types/records';

export type CommitLintRule = Plugin['rules'][string];

export type RuleParameters = Parameters<CommitLintRule>;

export type Commit = RuleParameters[0];

export type CommitBase = RemoveIndex<RuleParameters[0]>;

export const properties = ['body', 'footer', 'header', 'scope', 'subject', 'type'] satisfies (keyof CommitBase)[];

export type CommitProperty = (typeof properties)[number];

export type PluginRuleEntry = [ruleName: `cspell/${CommitProperty}`, ruleFn: CommitLintRule];
