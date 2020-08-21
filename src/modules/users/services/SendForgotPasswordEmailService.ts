import IUsersRepository from '@users/repositories/IUsersRepository'
import {inject, injectable} from 'tsyringe'
import path from 'path'
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider'
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

    const {token} = await this.userTokensRepository.generate(foundUser.id)
    const forgotPasswordMailTemplateFile = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')
    await this.mailProvider.sendMail({
      subject: '(Go Barber) Recuperação de senha',
      templateData: {
        file: forgotPasswordMailTemplateFile,
        variables: {link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`, name: foundUser.name}
      },
      to: {
        name: foundUser.name,
        email: foundUser.email
      }
    }
    )
  }
}
