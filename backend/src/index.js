import express from "express";
// import * as trpcExpress from "@trpc/server/adapters/express";
// import { appRouter } from "./trpc";
import cors from "cors";
// import { AppContext, createAppContext } from "./ctx";
// import { trpcRouter } from "./trpc/trpc";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
const cookieParser = require("cookie-parser");

export const prisma = new PrismaClient();
export const router = express.Router();


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

    app.get("/lessons", authToken, async (req, res) => {
      const lessons = await prisma.lesson.findMany({
        where: {
          userId: req.body.userId,
        },
      })
      res.json(lessons);
    });

    app.post("/createlesson", authToken, async (req, res) => {
      const { lessonName, link, time, userId } = req.body
      if (!await prisma.lesson.findFirst({
        where: {
          name: lessonName,
          userId: userId,
        }
      })) {
        await prisma.lesson.create({
          data: {
            name: lessonName,
            link: link,
            times: {
              create: {
                time: time,
              },
            },
            user: {
              connect:{
                id:userId
              }
            }
          },
          include: {
            times: true,
          },
        })
        res.sendStatus(200)
      } else {
        await prisma.lessonTime.create({
          data: {
            time: time,
            lesson: {
              connect: { id: lesson.id }
            }
          }
        })
        res.sendStatus(500)
      }
    })

    app.post("/registration", async (req, res) => {
      try {
        const { name, password, email } = req.body;
        const candidate = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (candidate) {
          res.send("Вже є така пошта, атятя");
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = await prisma.user.create({
          data: {
            name,
            password: hashedPassword,
            email,
          },
        });
        res.status(201).json(newUser);
      } catch (error) {
        console.error(error);
      }
    });
    app.post("/login", async (req, res) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: req.body.email
          },
        });
        if (!user) {
          res.sendStatus(401);
        }

        if (!await bcrypt.compare(req.body.password, user.password)) {
          res.send("dalbayob password")
        }
        const user_token = {
          "userId": user.id,
          "userRole": user.role
        }
        const access_token = generateAccessToken(user_token)
        const refresh_token = jwt.sign(user_token, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15d' })
        console.log(access_token)
        res.cookie("access_token", access_token, {
          httpOnly: true,
          secure: false
        })
        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          secure: false
        })
        res.sendStatus(200)


      } catch (error) {
        console.error;
      }
    });
    function generateAccessToken(user_token) {
      return jwt.sign(user_token, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '45m' })
    }
    function authToken(req, res, next) {
      const token = req.cookies.access_token
      if (!token) return res.sendStatus(403)

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user_token) => {
        if (err) return res.sendStatus(401)
        req.user = user_token
        next()
      })
    }
    async function refreshingToken(req, res, next) {
      const refresh_token = req.cookies.refresh_token
      if (!refresh_token) return res.sendStatus(401)
      const prismatoken = await prisma.token.findUnique({
        where: {
          refreshToken: refresh_token
        }
      })
      if (!prismatoken) return res.sendStatus(403)
      jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401)

      })
    }
  } catch (error) {
    console.error(error);
  }
})();
