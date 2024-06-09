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

  },

  //////////////ОТЧЁТНОСТЬ/////////////////////////////////////////////////////////////

  getTotalVisitorsByAttraction: async () => {// Общее количество посетителей
    const { data } = await $authHost.get('api/attendance/total-visitors');
    return data;
  },
  getAverageVisitorsByAttraction: async (period) => {// Среднее количество посетителей
    const { data } = await $authHost.post('api/attendance/average-visitors', { period }); // POST request
    return data;
  },
  getVisitorsByPeriod: async (period) => {// Количество посетителей в день/неделю/месяц
    const { data } = await $authHost.post('api/attendance/visitors-by-period', { period }); // POST request
    return data;
  },
  getTopAttractions: async (period) => {// Самые популярные аттракционы
    const { data } = await $authHost.post('api/attendance/top-attractions', { period }); // POST request
    return data;
  },
  getBottomAttractions: async (period) => {// Самые непопулярные аттракционы 
    const { data } = await $host.post('api/attendance/bottom-attractions', { period }); // POST request
    return data;
  },
  getTotalRevenue: async (period) => {// Общий доход
    const { data } = await $authHost.post('api/attendance/total-revenue', { period }); // POST request
    return data;
  },
  ggetRevenueByAttraction: async (period) => {// Доход по аттракционам
    const { data } = await $authHost.post('api/attendance/revenue-by-attraction', { period }); // POST request
    return data;
  },
};
export default ticketAPI; 