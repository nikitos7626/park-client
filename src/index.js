import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import AttractionStore from './store/AttractionStore';

export const Context = createContext(null)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user:new UserStore(),
        attractions:new AttractionStore()
    }}>
    <App />
    </Context.Provider>
);
