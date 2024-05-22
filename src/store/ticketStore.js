import { makeAutoObservable } from "mobx";
import ticketAPI from "../http/ticketAPI"; 

export default class TicketStore {
  constructor() {
    this._balance = 0;
    this._user = {};
    this._attractions = []; // Добавьте массив для аттракционов
    makeAutoObservable(this);
  }

  // Геттеры для получения информации из хранилища
  get balance() {
    return this._balance;
  }

  get user() {
    return this._user;
  }

  get attractions() {
    return this._attractions;
  }

  // Метод для обновления информации о пользователе
  setUser(user) {
    this._user = user;
  }

  // Метод для обновления баланса
  setBalance(newBalance) {
    this._balance = newBalance;
  }

  // Метод для обновления списка аттракционов
  setAttractions(attractions) {
    this._attractions = attractions;
  }

  async addBalance(amount) {
    try {
      const response = await ticketAPI.addbalance(amount);
      this.setBalance(response.balance);
    } catch (error) {
      console.error('Ошибка при пополнении баланса:', error);
    }
  }

  async buyTicket(name_attraction) {
    try {
      await ticketAPI.buyTicket(name_attraction); 
      // Получите обновленный баланс после покупки билета
      const balanceResponse = await ticketAPI.getBalance(); 
      this.setBalance(balanceResponse.balance); 
    } catch (error) {
      console.error('Ошибка при покупке билета:', error);
    }
  }

  async fetchAttractions() {
    try {
      const data = await ticketAPI.getAttractions();
      this.setAttractions(data);
    } catch (error) {
      console.error('Ошибка получения аттракционов:', error);
    }
  }

  logout() {
    this._user = {};
    this._balance = 0;
  }
}