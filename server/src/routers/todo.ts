import express from "express";
const router = express.Router();

import { EnumPriority, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Request, Response } from "express";

import { AuthenticatedRequest, authorization } from "../middlewares/auth";
import { UpdateTaskPayload, CreateTaskPayload, TaskPriority } from "../types";

router.get("/", authorization,async (req: AuthenticatedRequest, res: Response) => {
  const user_id = req.user_id;

  const tasks = await prisma.task.findMany({
    where: {
      userId: user_id,
    },
  });
  res.json(tasks);
});

router.post(
  "/",
  authorization,
  async (req: AuthenticatedRequest, res: Response) => {
    const createTaskPayload: CreateTaskPayload = req.body;
    const user_id: number = req.user_id!;
    const task = await prisma.task.create({
      data: { ...createTaskPayload, userId: user_id },
    });
    res.json(task);
  }
);

router.patch(
  "/:id",
  authorization,
  async (req: AuthenticatedRequest, res: Response) => {
    const updateTaskPayload: UpdateTaskPayload = req.body;
    const id = Number(req.params.id);
    const task = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        ...updateTaskPayload,
      },
    });
    res.json(task);
  }
);

router.delete(
  "/:id",
  authorization,
  async (req: AuthenticatedRequest, res: Response) => {
    const id = Number(req.params.id);
    const task = await prisma.task.findUnique({
      where: {
        id: id,
      }
    });
    if (task){
      await prisma.task.delete({
        where: {
          id: id,
      }
    }) ; 
    res.status(200).json({ message: "Task deleted successfully" });
  }
}
);


export default router;
