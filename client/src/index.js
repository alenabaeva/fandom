import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserFan from "./fandom/UserFan";
import SerialFan from "./fandom/SerialFan";


export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Context.Provider value = {{
    user: new UserFan(),
    serial: new SerialFan(),
  }}>
    <App />
    </Context.Provider>
); 