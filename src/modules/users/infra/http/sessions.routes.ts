import {Router} from 'express'
import { celebrate, Segments, Joi} from 'celebrate'
import UsersController from '../controllers/UsersController'

const sessionsRouter = Router()
const usersController = new UsersController()

sessionsRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  usersController.authenticate)

export default sessionsRouter
