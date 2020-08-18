
import User from '../infra/http/typeorm/entities/User'
import AppError from '@shared/errors/appError'
import IHashProvider from '@users/providers/HashProvider/models/IHashProvider'
import IUsersRepository from '@users/repositories/IUsersRepository'
import {inject, injectable} from 'tsyringe'

interface Request{
  user_id: string,
  email: string,
  name: string,
  password?: string,
  new_password?: string
}

@injectable()
export default class UpdateProfileService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({user_id, email, name, new_password, password}: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    const userWithEmail = await this.usersRepository.findByEmail(email)
    if (userWithEmail && userWithEmail.id !== user.id) {
      throw new AppError('Email already in use')
    }

    user.name = name
    user.email = email

    if (new_password && !password) {
      throw new AppError('Old password required to update password')
    }
    if (password && new_password) {
      const oldPasswordMatch = await this.hashProvider.compare(password, user.password)
      if (oldPasswordMatch) {
        user.password = await this.hashProvider.generateHash(new_password)
      } else {
        throw new AppError('Incorrect password')
      }
    }
    return this.usersRepository.update(user)

  }
}
