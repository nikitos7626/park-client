import { makeAutoObservable } from "mobx";
import ticketAPI from "../http/ticketAPI"; 
import UserStore from "./UserStore";

export default class TicketStore {
  constructor() {
    this._balance = 0;
    this._attractions = []; 
    this._tickets = [];
    this.userStore = new UserStore();
    this._overallAttendance = null; 
    this._weeklyAttendanceByDay = [];
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
  async fetchTickets(status = null) {
    try {
      const data = await ticketAPI.getTickets(status); 
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
  async fetchOverallAttendance() {
    try {
      const { data } = await ticketAPI.getOverallAttendance();
      return { overallAttendance: data, pieChartData: data }; 
    } catch (error) {
      console.error('Ошибка получения общей посещаемости:', error); 
      throw new Error('Ошибка получения общей посещаемости'); 
    }
  }
  async cancelTicket(name) {
    try {
      await ticketAPI.cancelTicket(name); // Вызов метода cancelTicket из ticketAPI
      await this.fetchTickets(); // Обновление списка билетов после отмены
    } catch (error) {
      console.error('Ошибка при отмене билета:', error);
      throw error; 
    }
  }

  async fetchWeeklyAttendanceByDay() {
    try {
      const { data } = await ticketAPI.getWeeklyAttendanceByDay();
      this._weeklyAttendanceByDay = data;
      return data; // Return the data
    } catch (error) {
      console.error('Ошибка получения еженедельной посещаемости по дням:', error);
      return null; // Or handle the error appropriately
    }
  }

  logout() {
    this._user = {};
    this._balance = 0;
  }
  
}