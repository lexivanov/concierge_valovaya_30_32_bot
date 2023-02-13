import { Message } from 'node-telegram-bot-api';
import { botStorage, BotUser } from '../storage';
import { MessageListener } from './messageListener';

export class MessageStartListener extends MessageListener {
    keyMessage = '/start';
    handle = async ({chat: {id: chatId}, from: user}: Message) => {
      const existingUser = botStorage.get(user.id);
      if (existingUser) {
        this.bot.sendMessage(chatId, `A я тебя уже знаю!, ты - ${existingUser.first_name} ${existingUser.last_name}`);
      } else {
        let botUser = botStorage.updateUser(user as BotUser);
        this.bot.sendMessage(chatId, `Привет, ${botUser.first_name} ${botUser.last_name}! Я твой персональный консьерж Ботыч, будем знакомы :)`);
      }
    };
}