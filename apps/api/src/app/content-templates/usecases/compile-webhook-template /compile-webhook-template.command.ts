import { IsDefined, IsObject, IsOptional } from 'class-validator';
import { BaseCommand } from '../../../shared/commands/base.command';

export class CompileWebhookTemplateCommand extends BaseCommand {
  @IsDefined()
  template: string;

  @IsObject()
  data: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
