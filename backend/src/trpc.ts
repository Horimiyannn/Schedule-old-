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
  getLessons: trpc.procedure.query(async () => {
    return await prisma.lesson.findMany({
      include: {
        times: true,
      },
    });
  }),
  addLesson: trpc.procedure
    .input(
      z.object({
        name: z.string(),
        link: z.string(),
        times: z.array(z.string()),
        userId: z.string(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { times, ...lessonData } = input;

      const lesson = await prisma.lesson.create({
        data: {
          ...lessonData,
          times: {
            create: times.map((time) => ({ time })),
          },
        },
      });

      return lesson;
    }),
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

      const token = jwt.sign({ userId: user.id}, JWT_SECRET, {expiresIn: '1h' });

      return {token, user}
    })
  });
// Export type definition of API
export type AppRouter = typeof appRouter;
