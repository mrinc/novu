import { ISmsOptions, ISmsProvider } from '@novu/stateless';
import { ChannelTypeEnum } from '@novu/shared';
import { ICredentials } from '@novu/dal';
import { IWebhookHandler } from '../interfaces';

export abstract class BaseWebhookHandler implements IWebhookHandler {
  protected provider: ISmsProvider;

  protected constructor(private providerId: string, private channelType: string) {}

  canHandle(providerId: string, channelType: ChannelTypeEnum) {
    return providerId === this.providerId && channelType === this.channelType;
  }

  async send(options: ISmsOptions) {
    if (process.env.NODE_ENV === 'test') {
      throw new Error('Currently 3rd-party packages test are not support on test env');
    }

    return await this.provider.sendMessage(options);
  }

  abstract buildProvider(credentials: ICredentials);
}
