import express from "express"; 
const router = express.Router(); 
import bcrypt from "bcryptjs"; 
import dotenv from "dotenv"; 
import path from 'path';

const envPath = path.join(__dirname, '..', '..', '.env');
dotenv.config({ path: envPath });

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import jwt from "jsonwebtoken";


import { Request, Response } from "express";

router.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { username },
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    const isPasswordValid = await bcrypt.compare(password, user.password); 
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (Number(process.env.TOKEN_EXPIRE_TIME_IN_HOURS) || 1) * 60 * 60,
        id : user.id}, process.env.JWT_SECRET || "secret" );

    return res.status(200).json({ message: "Login successful" 
        , token : token
});
});  


router.post("/register", async (req: Request, res: Response) => {
    {
        const{ username , password } = req.body; 
        const hashedPassword = await bcrypt.hash(password, 10); 
        const userExists = await prisma.user.findUnique({
            where : { username }
        })
        if (userExists) {
            return res.status(409).json({ message: "User already exists" });
        }
        const user = await prisma.user.create({
            data : {
                username : username, 
                password : hashedPassword
            }
        })
        
        return res.status(200).json({ 
            message: "User created successfully" 
            , user 
    });
    }
});
export default router; 
