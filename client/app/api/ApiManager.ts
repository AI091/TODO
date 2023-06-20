import axios from "axios";


const ApiManager = axios.create({
  baseURL: "https://cbc6-41-33-62-100.ngrok-free.app",
  responseType: "json",
  withCredentials: true,
});

export default ApiManager;
