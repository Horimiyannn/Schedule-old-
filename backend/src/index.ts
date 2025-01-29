import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './trpc'
import cors from 'cors'

const expressApp = express()
expressApp.use(cors())



expressApp.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
)


expressApp.listen(3000, () => {
  console.info('Listening at http://localhost:3000')
})