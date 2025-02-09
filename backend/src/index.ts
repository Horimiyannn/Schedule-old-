import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './trpc'
import cors from 'cors'
import { AppContext, createAppContext } from './ctx'




void (async () => {
// let ctx: AppContext | null = null
try {
  // ctx = createAppContext()
  const expressApp = express()

  
  expressApp.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true,
  }));
  
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
    })
  )

  expressApp.listen(3000, () => {
    console.info('Listening at http://localhost:3000')
})
} catch (error) {
  console.error(error)
  // await ctx?.stop()
}
})()