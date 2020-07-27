import express, { NextFunction, Response, Request } from 'express'
import 'express-async-errors'
import '../typeorm'
import routes from './routes'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/appError'
import cors from 'cors'
import '@shared/container'
const app = express();
app.use(cors())
app.use(express.json())

app.use('/images',express.static(uploadConfig.directory))
app.get('/', (req, res) => {
  console.log('im alive')
  res.send('im alive')
})
app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }
  console.error(err)
  return response.status(500).json({
    status: 'error',
    message: 'internal server error'
  })
})

app.listen(3030, () => console.log('running'));
