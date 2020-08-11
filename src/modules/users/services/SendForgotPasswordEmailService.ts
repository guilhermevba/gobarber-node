import IUsersRepository from '@users/repositories/IUsersRepository'
import {inject, injectable} from 'tsyringe'
import IMailProvider from '@users/providers/MailProvider/models/IMailProvider'
import AppError from '@shared/errors/appError'
import IUserTokensRepository from '@users/repositories/IUserTokensRepository'

interface Request{
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService{

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private userTokensRepository : IUserTokensRepository
    ) {}

  public async execute({email}: Request): Promise<void> {
    const foundUser = await this.usersRepository.findByEmail(email)

    if (!foundUser) {
      throw new AppError('User not found')
    }

    await this.userTokensRepository.generate(foundUser.id)

    this.mailProvider.sendMail(
      email,
      "you forgot your password"
    )
  }
}
