import { PrismaClient } from "@prisma/client";
import express from "express";
import authRouter from "./routers/auth";

const prisma  = new PrismaClient();
const app = express();

app.use(express.json());
app.use("/auth", authRouter);

app.listen(3000, () => console.log("Server is running on port 3000"));

