import type { FileRuleDefinition, RuleDefinition, RulesetDefinition } from './types';
export declare class RulesetValidationError extends Error {
    readonly message: string;
    constructor(message: string);
}
export declare function assertValidRuleset(ruleset: unknown): asserts ruleset is RulesetDefinition;
export declare function isValidRule(rule: FileRuleDefinition): rule is RuleDefinition;
export declare function assertValidRule(rule: FileRuleDefinition): asserts rule is RuleDefinition;
