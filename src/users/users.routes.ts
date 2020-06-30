import { Router } from 'express'
import CreateUserService from './services/CreateUserService';

const userRouter = Router()

userRouter.post('/', async (request, response) => {
  try{
    const { name, email, password } = request.body
    const createUserService = new CreateUserService()
    const user = await createUserService.execute({name, email, password})
    response.json(user)
  } catch(err) {
    response.status(400).json({error: err.message})
  }
})

export default userRouter
