import {Request, Response} from 'express'
import {container} from 'tsyringe'
import { classToClass} from 'class-transformer'
import CreateUserService from '@users/services/CreateUserService'
import AuthenticateUserService from '@users/services/AuthenticateUserService'

export default class UsersController {
  public async create(request: Request, response: Response) : Promise<Response> {
    const { name, email, password } = request.body
    const createUserService = container.resolve(CreateUserService)
    const user = await createUserService.execute({name, email, password})
    return response.json(classToClass(user))
  }

  public async authenticate(request: Request, response: Response): Promise<Response> {
    const {email, password} = request.body
    const authenticateUserService = container.resolve(AuthenticateUserService)
    const {user, token} = await authenticateUserService.execute({email, password})
    return response.json({user: classToClass(user), token})
  }
}
