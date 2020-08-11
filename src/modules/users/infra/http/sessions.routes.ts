import {Router} from 'express'
import UsersController from '../controllers/UsersController'

const sessionsRouter = Router()
const usersController = new UsersController()

sessionsRouter.post('/', usersController.authenticate)

export default sessionsRouter
