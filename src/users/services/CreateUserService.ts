import {getRepository} from 'typeorm'
import {hash} from 'bcryptjs'
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

    const hashedPassword = await hash(password, 8)
    const user = usersRepository.create({name, email, password: hashedPassword})
    await usersRepository.save(user)
    return user
  }
}
