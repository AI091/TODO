import ApiManager from "./ApiManager";
import axios, { AxiosError } from "axios";

export const get_tasks = async (token:any) => {
  try {
    const result = await ApiManager("/todo/", {
      method: "get",
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + token
      },
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
export const create_task = async (token:any, title:string, description:string) => {
    try {
        const result = await ApiManager("/todo/", {
          method: "post",
          headers: {
            "content-type": "application/json",
            "Authorization": "Bearer " + token
          },
          data:{
            "title": title,
            "description": description
          }
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

export const delete_task = async (token:any, id:string) =>{ 
try {
    const result = await ApiManager(`/todo/${id}`, {
      method: "delete",
      headers: {
        "content-type": "application/json",
        "Authorization": "Bearer " + token
      },

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


