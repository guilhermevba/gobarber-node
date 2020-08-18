import User from '../infra/http/typeorm/entities/User'
import AppError from '@shared/errors/appError'
import IUsersRepository from '@users/repositories/IUsersRepository'
import {inject, injectable} from 'tsyringe'
import IHashProvider from '@users/providers/HashProvider/models/IHashProvider'

interface Request{
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService{

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
    ) {}

  public async execute({name, email, password}: Request): Promise<User> {
    console.log(name, email, password)
    const existingEmail = await this.usersRepository.findByEmail(email)
    if (existingEmail) {
      throw new AppError('Email address already in use')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)
    const user = await this.usersRepository.create({name, email, password: hashedPassword})
    return user
  }
}
