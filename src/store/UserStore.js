import {makeAutoObservable} from 'mobx';
import {banUser,getUsers} from '../http/userAPI'

export default class UserStore {
    constructor() {
      this._isAuth = false;
      this._user = {};
      this._users = []; // Добавляем поле для хранения всех пользователей
      makeAutoObservable(this);
    }
  
    setIsAuth(bool) {
      this._isAuth = bool;
    }
  
    setUser(user) {
      this._user = user;
    }
  
    get isAuth() {
      return this._isAuth;
    }
  
    get user() {
      return this._user;
    }
  
    // Метод для получения всех пользователей
    async fetchUsers() {
        try {
          const users = await getUsers();
          this._users = users; // Обновляем _users
          return users;
        } catch (error) {
          console.error('Ошибка при получении пользователей:', error);
          return null;
        }
      }
    
      async banUser(email) {
        try {
          await banUser(email); // Вызываем API для блокировки
          this._users = this._users.map((user) =>
            user.email === email ? { ...user, role: 'Banned' } : user
          ); // Обновляем _users, устанавливая роль 'Banned' для заблокированного пользователя
        } catch (error) {
          console.error('Ошибка при блокировке пользователя:', error);
        }
      }
    
  
    get users() {
      return this._users;
    }
  }