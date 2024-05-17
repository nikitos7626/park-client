import { makeAutoObservable } from "mobx";
import ticketAPI from "../http/ticketAPI";

class TicketStore {
  constructor() {
    this._balance = 0; // Инициализируем баланс нулем
    this._user = {};
    makeAutoObservable(this);
  }

  // Геттеры для получения информации из хранилища
  get balance() {
    return this._balance;
  }

  get user() {
    return this._user;
  }

  // Метод для обновления информации о пользователе
  setUser(user) {
    this._user = user;
  }

  // Метод для обновления баланса
  setBalance(newBalance) {
    this._balance = newBalance;
  }
  async addBalance(amount) {
    try {
      const response = await ticketAPI.addbalance(amount); // Вызываем API
      console.log(response); // Проверяем ответ API
      this.setBalance(response.balance); // Обновляем баланс в хранилище
    } catch (error) {
      console.error('Ошибка при пополнении баланса:', error);
      // Обработать ошибку (например, вывести сообщение пользователю)
    }
  }
  logout() {
    this._user = {}; // Очищаем данные пользователя
    this._balance = 0; // Сбрасываем баланс
  }
}

const ticketStore = new TicketStore();

export default ticketStore;