import React, { createContext,useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import TicketStore from './store/ticketStore';
import config from './config';

export const Context = createContext(null);
console.log(config.REACT_APP_API_URL);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      ticket: new TicketStore(),
    }}
  >
    <App />
  </Context.Provider>
);