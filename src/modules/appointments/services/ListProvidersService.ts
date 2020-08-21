
import User from '@users/infra/http/typeorm/entities/User'
import IUsersRepository from '@users/repositories/IUsersRepository'
import {inject, injectable} from 'tsyringe'

interface Request{
  except_user_id: string
}

@injectable()
export default class ListProvidersService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({except_user_id}: Request): Promise<User[]> {
    const users = await this.usersRepository.findAllUsers({except_user_id})

    users.forEach(user => {
      delete user.password
    })

    return users
  }
}
