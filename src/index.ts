import TelegramBot from 'node-telegram-bot-api';
import { MessageListeners } from './message/messageListeners';
import { botStorage } from './storage';

const token = '6079716529:AAEssMLkD3sERGB_4zB0QRuoKQlG7fzgvtI';

const bot = new TelegramBot(token, {polling: true});
const messageListeners = new MessageListeners(bot);

botStorage.init();

bot.on('message', messageListeners.handle);