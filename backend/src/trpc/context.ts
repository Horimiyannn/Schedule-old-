import * as trpc from "@trpc/server";
import { inferAsyncReturnType } from "@trpc/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const createContext = async ({ req }: { req: Request }) => {
  const token = req.headers.authorization?.split(" ")[1]; // Очікується "Bearer <TOKEN>"
  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    } catch (error) {
      console.log("Invalid token");
    }
  }

  return { prisma, user };
};

export type Context = inferAsyncReturnType<typeof createContext>;