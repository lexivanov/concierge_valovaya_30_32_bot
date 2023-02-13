import { Message } from 'node-telegram-bot-api';
import { TelegramApi } from '../types';
import { InfoListener } from './info';
import { IMessageListener } from './messageListener';
import { MessageStartListener } from './start';

export class MessageListeners {
  listeners: Map<string, IMessageListener> = new Map();
  constructor(private bot: TelegramApi) {
    [
      new MessageStartListener(bot),
      new InfoListener(bot)
    ].forEach(this.register);
  }

  register = (listener: IMessageListener) => {
    this.listeners.set(listener.keyMessage, listener);
  }

  handle = async (event: Message) => {
    const chatId = event.chat.id;
    const handler = this.listeners.get(event.text);
    if (handler) {
      return handler.handle(event);
    } else {
      this.bot.sendMessage(chatId, 'Извини, не знаю такой команды :(');
    }
  }
}
