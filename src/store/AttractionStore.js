import { makeAutoObservable } from 'mobx';
import attractionAPI from '../http/attractionAPI'; // Импортируйте API


export default class AttractionStore {
  constructor() {
    this._Attractions = [];
    makeAutoObservable(this);
  }

  setAttractions(Attractions) {
    this._Attractions = Attractions;
  }

  get Attractions() {
    return this._Attractions;
  }

  async fetchAttractions() {
    try {
      const data = await attractionAPI.getBalance();
      this.setAttractions(data);
    } catch (error) {
      console.error('Ошибка получения аттракционов:', error);
      // Обработайте ошибку, например, покажите сообщение пользователю
    }
  }
}