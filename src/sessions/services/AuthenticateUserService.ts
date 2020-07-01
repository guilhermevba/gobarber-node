import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import User from '../../users/users.model'

interface Request {
  email: string;
  password: string;
}

interface Response{
  user: User
  token: string
}

export default class AuthenticateUserService{
  public async execute({email, password}: Request) : Promise<Response>{
    const usersRepository = getRepository(User)
    const user = await usersRepository.findOne({where : {email}})
    if (!user){
      throw new Error('Wrong email/password combination')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Wrong email/password combination')
    }
    const token = sign({}, 'oaisjd98234r', {
      subject: user.id,
      expiresIn: '1d'
    })
    return {user, token}
  }
}
