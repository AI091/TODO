import { Request } from 'express';



export interface TaskPriority {
    priority: "LOW" | "MEDIUM" | "HIGH" ;
}

export interface CreateTaskPayload {
  title: string;
  completed?: boolean;
  description?: string; 
  deadline?: Date; 
  
}
export interface UpdateTaskPayload {
  title?: string;
  completed?: boolean;
  description?: string; 
  deadline?: Date; 
}