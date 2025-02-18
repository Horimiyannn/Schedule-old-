import { initTRPC } from "@trpc/server";
import { lessons } from "./data/lessondata";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { error } from "console";


const prisma = new PrismaClient();
const trpc = initTRPC.create();

const JWT_SECRET = 'barotrauma';

export const appRouter = trpc.router({
 
    addUser: trpc.procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);
      return await prisma.user.create({
        data: {
          ...input,
          password: hashedPassword,
        },
      });
    }),
    loginUser: trpc.procedure
    .input(
     z.object({
      email: z.string().email(),
      password: z.string(),
     })
    )
    .mutation(async ({input}) => {
      const user = await prisma.user.findUnique({
        where: { email: input.email},
      });

      if (!user) {
        throw new Error('User not found');
      }

      const isValidPassword = await bcrypt.compare(input.password, user.password);

      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ userId: user.id}, JWT_SECRET, {expiresIn: '1w' });

      return {token, user}
    }),
    getUserInfo: trpc.procedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      try {
        const decoded = jwt.verify(input.token, JWT_SECRET) as { userId: string };
        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
        });
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        throw new Error('Invalid token');
      }
    }),
    getUserSchedule: trpc.procedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      try {
        const decoded = jwt.verify(input.token, JWT_SECRET) as { userId: string };
        const lessons = await prisma.lesson.findMany({
          where: { userId: decoded.userId },
          include: { times: true },
        });
        return lessons;
      } catch (error) {
        throw new Error('Invalid token');
      }
    }),
    getSession: trpc.procedure.query(({ ctx }) => {
      const authHeader = ctx.req.headers.authorization;
      if (!authHeader) {
        return null;
      }
  
      const token = authHeader.split(' ')[1];
      if (!token) {
        return null;
      }
  
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return { userId: decoded.userId };
      } catch {
        return null;
      }
    }),
  });
// Export type definition of API
export type AppRouter = typeof appRouter;
