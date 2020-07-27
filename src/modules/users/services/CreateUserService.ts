import {hash} from 'bcryptjs'
import User from '../infra/typeorm/entities/users.model'
import AppError from '@shared/errors/appError'
import IUsersRepository from '@users/repositories/IUsersRepository'
import {inject, injectable} from 'tsyringe'

interface Request{
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService{

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
    ) {}

  public async execute({name, email, password}: Request): Promise<User> {
    const existingEmail = await this.usersRepository.findByEmail(email)
    if (existingEmail) {
      throw new AppError('Email address already in use')
    }

    const hashedPassword = await hash(password, 8)
    const user = await this.usersRepository.create({name, email, password: hashedPassword})
    return user
  }
}
