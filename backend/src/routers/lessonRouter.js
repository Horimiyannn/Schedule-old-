import express from "express";

import { prisma } from "..";
import { authToken } from "../middleware/authToken";
const cookieParser = require("cookie-parser");

const lsnRouter = express.Router()
lsnRouter.use(express.json())
lsnRouter.use(cookieParser())



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
                  id: true,
               },
               orderBy: {
                  time: "asc"
               }
            }
         }
      })

      const schedule =
         [
            { id: 0, name: "Понеділок", lessons: [] },
            { id: 1, name: "Вівторок", lessons: [] },
            { id: 2, name: "Середа", lessons: [] },
            { id: 3, name: "Четвер", lessons: [] },
            { id: 4, name: "Пятниця", lessons: [] },
            { id: 5, name: "Субота", lessons: [] }
         ]
      lessons.forEach((lesson) => {
         lesson.times.forEach((item) => {
            const [day, ltime] = item.time.split(" ");

            schedule.forEach((days) => {
               if (days.name === day) {
                  days.lessons.push({ ...lesson, time: ltime })
                  lesson.time = ltime
               }
            })
         })
      })

      res.json(schedule);
   } catch (error) {
      console.error(error)
      res.sendStatus(500)
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
lsnRouter.patch("/editlesson", authToken, async (req, res) => {
   const lesson = req.body
   try {
      console.log(lesson)
      await prisma.lesson.update({
         where: {
            id: lesson.id,
         },

         data: {
            name: lesson.name,
            link: lesson.link,
         }
      })
      await Promise.all(
         lesson.times.map(t =>
            prisma.lessonTime.update({
               where: { id: t.id },
               data: { time: t.time }
            })
         )
      )
      res.sendStatus(200)
   } catch (error) {
      console.error(error)
   }
})


lsnRouter.post("/deletelesson", authToken, async (req, res) => {
   try {
      await prisma.lesson.delete({
         where: {
            id: req.body.data
         },
      })
      res.sendStatus(200)
   } catch (error) {
      console.error(error)
   }

})

export default lsnRouter



