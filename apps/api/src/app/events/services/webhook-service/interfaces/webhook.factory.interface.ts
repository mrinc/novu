import { IntegrationEntity } from '@novu/dal';
import { IWebhookHandler } from './webhook.handler.interface';

export interface IWebhookFactory {
  getHandler(integration: IntegrationEntity): IWebhookHandler;
}
