import express from "express";
import jwt from 'jsonwebtoken';
import { prisma } from "..";
const cookieParser = require("cookie-parser");

const lsnRouter = express.Router()
lsnRouter.use(express.json())
lsnRouter.use(cookieParser())

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

lsnRouter.get("/getlessons", authToken, async (req, res) => {
   try {
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
   } catch (error) {
      console.error(error)
   }

});

lsnRouter.post("/createlesson", authToken, async (req, res) => {
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
lsnRouter.patch("/redactlesson", authToken,async (req,res) =>{
   const lesson = req.body
   try {
      await prisma.lesson.update({
         data:{
            name:lesson.name,
            link:lesson.link,
            times:{
               connect:{
                  time
               }
            }
         }
      })
   } catch (error) {
      console.error(error)
   }
})

export default lsnRouter



