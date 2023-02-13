import {User} from 'node-telegram-bot-api';
import fs from 'fs/promises';

export enum Roles {
  User,
  Admin
} 

export interface BotUser extends User {
  role: Roles
}

const storagePath = '/storage.json';

class BotStorage {
  users: Map<number, BotUser> = new Map();

  init = async () => {
    try {
      const stored = await fs.readFile(storagePath, {encoding: 'utf-8'});
      if (stored) {
        const data = JSON.parse(stored);
        this.users = new Map();
        data.users.map(user => JSON.parse(user)).forEach(this.updateUser);
      }
    } catch(e: any) {
      console.log('Нет файла хранилища');
    } finally {
      console.log('Хранилище инициализировано');
    }
  }

  save = async () => {
    const data = {
      users: [...this.users.values()].map(value => JSON.stringify(value))
    };
    return fs.writeFile(storagePath, JSON.stringify(data), {encoding: 'utf-8'});
  }

  addUser = (user: BotUser) => {
    if (!this.users.get(user.id)) {
      this.users.set(user.id, {...user, role: user.role || Roles.User});
    }
    this.save();
    return this.get(user.id);
  }

  removeUser = (id: number) => {
    if (this.users.get(id)) {
      this.users.delete(id);
    }
    this.save();
  }

  updateUser = (user: BotUser) => {
    const currentVersion = this.users.get(user.id);
    if (!currentVersion) {
      this.addUser(user);
    } else {
      const newUser = { ...currentVersion, ...user};
      this.users.set(newUser.id, newUser);
    }
    this.save();
    return this.get(user.id);
  }

  setRole = (id: number, role: Roles) => {
    const currentUser = this.users.get(id);
    if (!currentUser) return;
    currentUser.role = role;
    this.save();
    return this.get(id);
  }

  get = (id: number) => {
    return this.users.get(id);
  }
}

export const botStorage = new BotStorage();