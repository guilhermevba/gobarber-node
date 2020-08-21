import { Router } from 'express'
import {celebrate, Segments, Joi} from 'celebrate'
import multer from 'multer'
import uploadConfig from '@config/upload'
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController'
import UsersAvatarController from '../controllers/UsersAvatarController'

const userRouter = Router()
const usersAvatarController = new UsersAvatarController()
const usersController = new UsersController()
const upload = multer(uploadConfig)

userRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  usersController.create)

userRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), usersAvatarController.update)

export default userRouter
