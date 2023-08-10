import type { JsonPath } from '@stoplight/types';
declare type Options = {
    schemesPath: JsonPath;
};
declare const _default: import("@stoplight/spectral-core").RulesetFunctionWithValidator<{
    paths: Record<string, unknown>;
}, Options>;
export default _default;
