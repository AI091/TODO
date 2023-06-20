import { PrismaClient } from "@prisma/client";
import express from "express";
import authRouter from "./routers/auth";
import todoRouter from "./routers/todo";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/todo", todoRouter);

app.listen(8000);
