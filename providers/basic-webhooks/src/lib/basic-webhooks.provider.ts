import {
  ChannelTypeEnum,
  ISMSEventBody,
  ISendMessageSuccessResponse,
  ISmsOptions,
  ISmsProvider,
} from '@novu/stateless';

export class BasicWebhooksSmsProvider implements ISmsProvider {
  id = 'basic-webhooks';
  channelType = ChannelTypeEnum.WEBHOOK as ChannelTypeEnum.WEBHOOK;
  private axiosInstance: AxiosInstance;

  constructor(
    private config: {
      apiKey: string;
      secretKey: string;
    }
  ) {
    this.axiosInstance = axios.create({
      auth: {
        username: config.apiKey,
        password: config.secretKey,
      },
    });
  }

  async sendMessage(
    options: ISmsOptions
  ): Promise<ISendMessageSuccessResponse> {
    const data = qs.stringify({
      message: options.content,
      to: options.to,
      from: options.from,
    });

    const response = await this.axiosInstance.post(
      'https://api.transmitsms.com/send-sms.json',
      data
    );

    return {
      id: response.data.message_id,
      date: response.data.send_at,
    };
  }
}
