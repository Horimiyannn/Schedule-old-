import express from "express";
import cors from "cors";
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
          userId: req.user.id,
        },
        include: {
          times: {
            select: {
              time: true,
            },
            orderBy: {
              time: "asc"
            }
          }
        }
      })
      const sortedLessons = {}
      const dow = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"]
      dow.forEach((day) => {
        sortedLessons[day] = []
      })
      lessons.forEach((lesson) => {
        lesson.times.forEach((item) => {
          const [day, ltime] = item.time.split(" ");
          if (dow.includes(day)) {
            sortedLessons[day].push({ ...lesson, time: ltime })
          }
        })
      })
      res.json(sortedLessons);
    });

    app.post("/createlesson", authToken, async (req, res) => {
      const user = req.user
      const { name, link, time, } = req.body
      try {
        const newLesson = await prisma.lesson.findFirst({
          where: {
            name: name,
            userId: user.id,
          }
        })
        if (!newLesson) {
          await prisma.lesson.create({
            data: {
              name: name,
              link: link,
              times: {
                create: {
                  time: time,
                },
              },
              user: {
                connect: {
                  id: user.id
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
                connect:
                  { id: newLesson.id }
              }
            },
            include: {
              lesson: true
            }
          })
          res.sendStatus(200)
        }
      } catch (err) {
        console.log(err)
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
          res.send("bad password")
        }
        const user_token = {
          "id": user.id,
          "role": user.role,
          "name": user.name
        }
        const access_token = generateAccessToken(user_token)
        res.cookie("access_token", access_token)
        res.sendStatus(200)
      } catch (error) {
        console.error;
      }
    });

    app.post("/logout", (req, res) => {
      try {
        res.clearCookie("access_token", { path: '/' })
        res.sendStatus(200)
      } catch (err) {
        console.error(err)
      }
    })
    function generateAccessToken(user_token) {
      return jwt.sign(user_token, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '45m' })
    }

    app.get("/me", authToken, (req, res) => {
      if (req.user) {
        res.json({ authStatus: true })
      } else {
        res.json({ authStatus: false })
      }
    })

    app.get("/homework", authToken, async (req, res) => {
      const user = req.user
      try {
        const homework = await prisma.homework.findMany({
          where: {
            givenTo: {
              every: {
                id: user.id
              }
            }
          },
          include: {
            lesson: {
              select: {
                name: true,
                id: true
              }
            }
          }
        })
        const lessonNames = await prisma.lesson.findMany({
          where: {
            userId: user.id
          },
          select: {
            name: true,
            id: true,
          }
        })
        const response = { homework, lessonNames }
        res.json(response)
      } catch (err) {
        console.error(err)
      }
    })

    app.post("/createhomework", authToken, async (req, res) => {
      const user = req.user
      const newHw = req.body
      try {
        const newHomework = await prisma.homework.create({
          data: {
            givenTo: {
              connect: {
                id: user.id
              }
            },
            lesson: {
              connect: {
                id: newHw.lid
              }
            },
            task: newHw.task,
            deadline: newHw.deadline
          }
        })
        res.sendStatus(200)
      } catch (error) {
        console.error(error)
      }
    })

    function authToken(req, res, next) {
      const token = req.cookies.access_token
      if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user_token) => {
          if (err) res.clearCookie("access_token", { path: '/' })
          req.user = user_token
        })
      }
      next()
    }

  } catch (error) {
    console.error(error);
  }
})();
