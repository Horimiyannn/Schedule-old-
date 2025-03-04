import express from "express";
import jwt from 'jsonwebtoken';
import { prisma } from "..";
const cookieParser = require("cookie-parser");

const hwRouter = express.Router()
hwRouter.use(express.json())
hwRouter.use(cookieParser())

function authToken(req, res, next) {
   try {
      const token = req.cookies.access_token
      if (token) {
         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user_token) => {
            if (err) return res.clearCookie("access_token", { path: '/' })
            req.user = user_token
         })
      }
      next()
   } catch (error) {
      console.error(error)
   }
}
hwRouter.get("/gethomework", authToken, async (req, res) => {
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
         },
         orderBy: {
            deadline: "asc"
         }
      })
      const lessonNames = await prisma.lesson.findMany({
         where: {
            userId: user.id
         },
         select: {
            name: true,
            id: true,
         },
         orderBy: {
            name: "asc"
         }

      })
      const response = { homework, lessonNames }
      res.json(response)
   } catch (err) {
      console.error(err)
   }
})

hwRouter.post("/createhomework", authToken, async (req, res) => {
   const user = req.user
   const newHw = req.body
   try {
      await prisma.homework.create({
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

hwRouter.patch("/redacthomework", authToken, async (req, res) => {
   const homework = req.body
   try {
      await prisma.homework.update({
         where: {
            id: homework.id
         },
         data: {
            task: homework.task,
            deadline: homework.deadline
         }
      })
   } catch (error) {
      console.error(error)
   }
})

hwRouter.patch("/completehomework", authToken, async (req, res) => {
   const user = req.user
   const homework = req.body
   try {
      await prisma.homework.update({
         where: {
            id: homework.id,
            givenTo: {
               some: {
                  id: user.id
               }
            }
         },
         data: {
            completeStatus: !homework.completeStatus
         }
      })
      res.sendStatus(200)
   } catch (error) {
      console.error(error)
   }
})

hwRouter.delete("/deletehomework", authToken, async (req, res) => {
   try {
      await prisma.homework.delete({
         where: {
            id: req.body.id
         }
      })
      res.sendStatus(200)
   } catch (error) {
      console.error(error)
   }
})
export default hwRouter







