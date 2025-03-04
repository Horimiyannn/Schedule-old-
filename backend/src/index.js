import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
const cookieParser = require("cookie-parser");
import hwRouter from './routers/homeworkRouter'
import lsnRouter from "./routers/lessonRouter";
import userRouter from "./routers/userRouter";

export const prisma = new PrismaClient();



void (async () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      })
    );
    app.use(cookieParser());
    app.listen(3000, () => {
      console.info("Listening at http://localhost:3000");
    });
    app.use("/homework", hwRouter);
    app.use("/lesson", lsnRouter)
    app.use("/user", userRouter)

  } catch (error) {
    console.error(error);
  }
})();
