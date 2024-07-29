import type { Plugin } from '@commitlint/types';

export type RemoveIndex<T> = {
  [K in keyof T as symbol extends K ? never : string extends K ? never : number extends K ? never : K]: T[K];
};

export type CommitLintRule = Plugin['rules'][string];

export type RuleParameters = Parameters<CommitLintRule>;

export type Commit = RuleParameters[0];

export type CommitBase = RemoveIndex<RuleParameters[0]>;

export const properties = ['body', 'footer', 'header', 'scope', 'subject', 'type'] satisfies (keyof CommitBase)[];

export type CommitProperty = (typeof properties)[number];

export type PluginRuleEntry = [ruleName: `cspell/${CommitProperty}`, ruleFn: CommitLintRule];
