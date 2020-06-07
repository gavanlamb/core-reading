export interface MessageRequestBody {
  message: MessageBody;
  subscription: string;
}

export interface MessageBody {
  messageId: string;
  publishTime: Date;
  data: string;
}

export interface ReadingMessage {
  topic: string;
  body: any;
}
