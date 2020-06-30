import {getRepository} from 'typeorm'
import User from '../users.model'

interface Request{
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService{
  public async execute({name, email, password}: Request): Promise<User>{
    const usersRepository = getRepository(User)
    const existingEmail = await usersRepository.findOne({where: {email}})
    if (existingEmail) {
      throw new Error('Email address already in use')
    }
    const user = await usersRepository.create({name, email, password})
    usersRepository.save(user)
    return user
  }
}
