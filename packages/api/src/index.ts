import { config } from "dotenv";

try {
  const result = config();
  if(result && result.parsed) {
    Object.keys(result.parsed).forEach(key => {
      process.env[key] = result.parsed[key];
    });
  }
} catch(e) {
  console.info('.env file not found, skipping..');
}



import App from './App';
new App(3001).listen();
