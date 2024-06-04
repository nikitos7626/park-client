import { $authHost, $host} from "./index";

const ticketAPI = {
  addbalance: async (balance) => {
    const { data } = await $authHost.post('api/user/addmoney', { balance }); 
    return data;
  },

  buyTicket: async (name_attraction) => {
    const { data } = await $authHost.post('api/ticket/buy', {name_attraction }); 
    return data;
  },

  getBalance: async () => {
    const { data } = await $authHost.get('api/user/getBalance');
    return data;
  },

  getAttractions: async () => {
    const { data } = await $host.get('api/attraction/getAllAttractions');
    return data;
  },
  getTickets: async()=>{
    const {data} = await $authHost.get('api/ticket/getTickets')
    return data;
  },
  useTicket: async (name) => {
    const { data } = await $authHost.post('api/ticket/useTicket', { name });
    return data;
  },
  
  addTicket: async (name, price, working_hours) => {
    const { data } = await $authHost.post('api/attraction/create', { name, price, working_hours });
    return data;
  }  
};
export default ticketAPI; 