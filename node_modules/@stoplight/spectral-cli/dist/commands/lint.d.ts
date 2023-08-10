import type { CommandModule } from 'yargs';
import { IRuleResult } from '@stoplight/spectral-core';
import { FailSeverity } from '../services/config';
declare const lintCommand: CommandModule;
export declare const severeEnoughToFail: (results: IRuleResult[], failSeverity: FailSeverity) => boolean;
export default lintCommand;
