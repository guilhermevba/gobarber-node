import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import User from '../../users/users.model'
import authConfig from '../../config/auth'
import auth from '../../config/auth'

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

    const {secret, expiresIn} = authConfig.jwt
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })
    return {user, token}
  }
}
