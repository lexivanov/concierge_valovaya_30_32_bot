import {Message} from 'node-telegram-bot-api';
import { TelegramApi } from '../types';

export interface IMessageListener {
    bot: TelegramApi,
    keyMessage: string,
    handle: (event: Message) => Promise<void>;
}

export abstract class MessageListener implements IMessageListener {
  constructor(public bot: TelegramApi) {}
  handle: (event: Message) => Promise<void>;
  keyMessage: string;
}