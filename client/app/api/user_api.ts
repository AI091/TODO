import ApiManager from "./ApiManager";
import axios, { AxiosError } from "axios";

export const user_login = async (username:string , password: string) => {
  const data = {
    "username": username , 
    "password": password
  }  
  try {
    const result = await ApiManager("/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: data,
    });
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error(
          `Error: ${axiosError.response.status} - ${axiosError.response.statusText}`
        );
      } else {
        console.error("Error: Request was not made due to a network issue.");
      }
    } else {
      console.error("Error: An unknown error occurred.", error);
    }
  }
};

export const user_register = async (username:string , password: string) => {
    const data = {
        "username": username ,
        "password": password
    }
    try {
        const result = await ApiManager("/auth/register", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          data: data,
        });
        return result;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response) {
            console.error(
              `Error: ${axiosError.response.status} - ${axiosError.response.statusText}`
            );
          } else {
            console.error("Error: Request was not made due to a network issue.");
          }
        } else {
          console.error("Error: An unknown error occurred.", error);
        }
      }
    };

