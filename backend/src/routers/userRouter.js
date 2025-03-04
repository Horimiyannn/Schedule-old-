import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import express from "express";
import { prisma } from "..";
const cookieParser = require("cookie-parser");

const userRouter = express.Router()
userRouter.use(express.json())
userRouter.use(cookieParser())

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

userRouter.post("/registration", async (req, res) => {
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

userRouter.post("/login", async (req, res) => {
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

userRouter.post("/logout", (req, res) => {
   try {
      res.clearCookie("access_token", { path: '/' })
      res.sendStatus(200)
   } catch (err) {
      console.error(err)
   }
})



userRouter.patch("/redactuser", authToken, async (req, res) => {
   const user = req.body
   try {
      await prisma.user.update({
         where: {
            id: user.id
         },
         data: {
            name: user.name,
            email: user.email,
            password: user.password,
         }
      })
   } catch (error) {
      console.error(error)
   }
})

userRouter.delete("/deleteuser", authToken, async (req, res) => {
   try {
      await prisma.user.delete({
         where: {
            id: req.user.id
         }
      })
   } catch (error) {
      console.error(error)
   }
})
function generateAccessToken(user_token) {
   return jwt.sign(user_token, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '45m' })
}

userRouter.get("/me", authToken, (req, res) => {
   if (req.user) {
      res.json({ authStatus: true })
   } else {
      res.json({ authStatus: false })
   }
})

export default userRouter