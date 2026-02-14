import type { AnyRuleConfig, Plugin, RuleConfigQuality } from '@commitlint/types';

export type CommitLintRule = Plugin['rules'][string];

export type RuleParameters = Parameters<CommitLintRule>;

export type Commit = RuleParameters[0];

export const properties = ['body', 'footer', 'header', 'scope', 'subject', 'type'] satisfies (keyof Commit)[];

export type CommitProperty = (typeof properties)[number];

export type CspellRuleName = `cspell/${CommitProperty}`;

export type PluginRulesConfig = Record<CspellRuleName, AnyRuleConfig<RuleConfigQuality.User>>;

export type PluginRuleEntry = [ruleName: CspellRuleName, ruleFn: CommitLintRule];
