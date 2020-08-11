import IUsersRepository from '@users/repositories/IUsersRepository'
import {inject, injectable} from 'tsyringe'
import {differenceInMinutes} from 'date-fns'
import IUserTokensRepository from '@users/repositories/IUserTokensRepository'
import AppError from '@shared/errors/appError'
import IHashProvider from '@users/providers/HashProvider/models/IHashProvider'

interface Request{
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordService{

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private userTokensRepository : IUserTokensRepository,
    @inject('HashProvider')
    private hashProvider : IHashProvider
    ) {}

  public async execute({token, password}: Request): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('user`s token not found')
    }


    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('user not found')
    }

    const tokenAgeInMinutes = differenceInMinutes(Date.now(), userToken.created_at)

    if (tokenAgeInMinutes > 120) {
      throw new AppError('Token expired')
    }
    Object.assign(user, {password: await this.hashProvider.generateHash(password)})

    await this.usersRepository.update(user)
  }
}
