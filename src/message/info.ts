import { Message } from 'node-telegram-bot-api';
import { botStorage } from '../storage';
import { MessageListener } from './messageListener';

export class InfoListener extends MessageListener {
    keyMessage = '/info';
    handle = async ({chat: {id: chatId}, from: user}: Message) => {
      const existingUser = botStorage.get(user.id);
      if (existingUser) {
        await this.bot.sendMessage(chatId, `Инфа о тебе:\n${JSON.stringify(existingUser)}`);
      } else {
        await this.bot.sendMessage(chatId, `Извини, не могу тебя найти в базе данных`);
      }
    };
}