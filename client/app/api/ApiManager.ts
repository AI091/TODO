import axios from "axios";
// import dotenv from 'dotenv';
// import path from 'path';

// dotenv.config({ path: ( '../../.env') });

const ApiManager = axios.create({
  baseURL: "https://0524-41-33-62-100.ngrok-free.app/",
  responseType: "json",
  withCredentials: true,
});

export default ApiManager;
