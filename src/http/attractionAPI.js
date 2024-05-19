import { $authHost} from "./index";

const attractionAPI = {
  getBalance: async () => {
    const { data } = await $authHost.get('api/attraction/getAllAttractions');
    return data;
  }
};

export default attractionAPI; 