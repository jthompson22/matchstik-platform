import { config } from "dotenv";

if(process.env.NODE_ENV !== 'production') {
  const result = config();

  Object.keys(result.parsed).forEach(key => {
    process.env[key] = result.parsed[key];
  });
}


import App from './App';
new App(3001).listen();
