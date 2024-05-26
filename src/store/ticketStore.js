import { makeAutoObservable } from "mobx";
import ticketAPI from "../http/ticketAPI"; 

export default class TicketStore {
  constructor() {
    this._balance = 0;
    this._user = {};
    this._attractions = []; 
    this._tickets = [];
    makeAutoObservable(this);
  }

  // Геттеры для получения информации из хранилища
  get balance() {
    return this._balance;
  }

  get user() {
    return this._user;
  }
  
  get tickets() {
    return this._tickets;
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
  setTickets(tickets) {
    this._tickets = tickets;
  }

  async useTicket(name) {
    try {
      await ticketAPI.useTicket(name);
      await this.fetchTickets();
    } catch (error) {
      console.error('Ошибка при использовании билета:', error);
      throw error;
    }
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
  async fetchTickets() {
    try {
      const data = await ticketAPI.getTickets(); 
      this.setTickets(data);
    } catch (error) {
      console.error('Ошибка получения билетов:', error);
    }
  }

  logout() {
    this._user = {};
    this._balance = 0;
  }
}