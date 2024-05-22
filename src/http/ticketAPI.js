import { $authHost, $host} from "./index";

const ticketAPI = {
  addbalance: async (balance) => {
    const { data } = await $authHost.post('api/user/addmoney', { balance }); 
    return data;
  },

  buyTicket: async (name_attraction) => {
    const { data } = await $authHost.post('api/ticket/buy', {name_attraction:name_attraction }); 
    return data;
  },

  getBalance: async () => {
    const { data } = await $authHost.get('api/user/getBalance');
    return data;
  },

  getAttractions: async () => {
    const { data } = await $host.get('api/attraction/getAllAttractions');
    return data;
  }
  
};

export default ticketAPI; // Экспортируем объект