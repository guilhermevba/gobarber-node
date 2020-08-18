
import User from '../infra/http/typeorm/entities/User'
import AppError from '@shared/errors/appError'
import IHashProvider from '@users/providers/HashProvider/models/IHashProvider'
import IUsersRepository from '@users/repositories/IUsersRepository'
import {inject, injectable} from 'tsyringe'

interface Request{
  user_id: string
}

@injectable()
export default class ShowProfileService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({user_id}: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    delete user.password

    return user
  }
}
