import { makeAutoObservable } from "mobx";
import ticketAPI from "../http/ticketAPI"; 
import UserStore from "./UserStore";

export default class TicketStore {
  constructor() {
    this._balance = 0;
    this._attractions = []; 
    this._tickets = [];
    this.userStore = new UserStore();
    this._totalVisitors = 0; 
    this._averageVisitors = 0;
    this._visitorsByPeriod = [];
    this._topAttractions = []; 
    this._bottomAttractions = []; 
    this._totalRevenue = 0;
    this._revenueByAttraction = [];
    makeAutoObservable(this);
  }

  // Геттеры для получения информации из хранилища
  get balance() {
    return this._balance;
  }

  get user() {
    return this.userStore.user;
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
      const balanceResponse = await ticketAPI.getBalance(); 
      this.setBalance(balanceResponse.balance); 
    } catch (error) {
      console.error('Ошибка при покупке билета:', error);
    }
  }

  async fetchBalance() {
    try {
      const response = await ticketAPI.getBalance(); 
      this.setBalance(response.balance); 
    } catch (error) {
      console.error('Ошибка получения баланса:', error);
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
  async createAttraction(name, price, working_hours) {
    try {
      const data = await ticketAPI.addTicket(name, price, working_hours);
      this.setAttractions([this.attractions, data.attraction]);
    } catch (error) {
      console.error('Ошибка при создании аттракциона:', error);
      throw error;
    }
  }
   //////////////ОТЧЁТНОСТЬ/////////////////////////////////////////////////////////////

  get totalVisitors() {
    return this._totalVisitors;
  }

  get averageVisitors() {
    return this._averageVisitors;
  }

  get visitorsByPeriod() {
    return this._visitorsByPeriod;
  }

  get topAttractions() {
    return this._topAttractions;
  }

  get bottomAttractions() {
    return this._bottomAttractions;
  }

  get totalRevenue() {
    return this._totalRevenue;
  }

  get revenueByAttraction() {
    return this._revenueByAttraction;
  }

  async fetchTotalVisitors() {
    try {
      const data = await ticketAPI.getTotalVisitorsByAttraction();
      this._totalVisitors = data;
    } catch (error) {
      console.error('Ошибка получения общего количества посетителей:', error);
    }
  }

  async fetchAverageVisitors(period) {
    try {
      const data = await ticketAPI.getAverageVisitorsByAttraction(period);
      this._averageVisitors = data;
    } catch (error) {
      console.error('Ошибка получения среднего количества посетителей:', error);
    }
  }

  async fetchVisitorsByPeriod(period) {
    try {
      const data = await ticketAPI.getVisitorsByPeriod(period);
      this._visitorsByPeriod = data;
    } catch (error) {
      console.error('Ошибка получения количества посетителей за период:', error);
    }
  }

  async fetchTopAttractions(period) {
    try {
      const data = await ticketAPI.getTopAttractions(period);
      this._topAttractions = data;
    } catch (error) {
      console.error('Ошибка получения самых популярных аттракционов:', error);
    }
  }

  async fetchBottomAttractions(period) {
    try {
      const data = await ticketAPI.getBottomAttractions(period);
      this._bottomAttractions = data;
    } catch (error) {
      console.error('Ошибка получения самых непопулярных аттракционов:', error);
    }
  }

  async fetchTotalRevenue(period) {
    try {
      const data = await ticketAPI.getTotalRevenue(period);
      this._totalRevenue = data;
    } catch (error) {
      console.error('Ошибка получения общего дохода:', error);
    }
  }

  async fetchRevenueByAttraction(period) {
    try {
      const data = await ticketAPI.ggetRevenueByAttraction(period);
      this._revenueByAttraction = data;
    } catch (error) {
      console.error('Ошибка получения дохода по аттракционам:', error);
    }
  }
  logout() {
    this._user = {};
    this._balance = 0;
  }
}