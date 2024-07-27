import { spellCheckDocument, type ValidationIssue } from 'cspell-lib';

import type { CommitProperty, CommitLintRule } from './types.js';

export async function checkSpelling(text: string | null | undefined): Promise<ValidationIssue[]> {
  if (!text) {
    return [];
  }

  const results = await spellCheckDocument(
    {
      text,
      uri: '',
      languageId: 'plaintext',
      locale: 'en',
    },
    {
      generateSuggestions: false,
    },
    {},
  );

  return results.issues;
}

export function makeMessage(property: CommitProperty, issues: ValidationIssue[]): string | undefined {
  if (issues.length) {
    const misspelledWords = issues.map((issue) => issue.text);

    return `Spelling error found in ${property}: ${misspelledWords.join(', ')}`;
  }
}

export function makeRule(property: CommitProperty): CommitLintRule {
  return async (parsed) => {
    const issues = await checkSpelling(parsed[property]);

    return [!issues.length, makeMessage(property, issues)];
  };
}
