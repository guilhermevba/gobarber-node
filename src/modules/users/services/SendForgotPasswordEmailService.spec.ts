import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'
import FakeMailProvider from '@shared/providers/MailProvider/fakes/FakeMailProvider'
import AppError from '@shared/errors/appError'
import FakeUserTokensRepository from '@users/repositories/fakes/FakeUserTokensRepository'

let fakeUsersRepository: FakeUsersRepository,
fakeMailProvider: FakeMailProvider,
fakeUserTokensRepository: FakeUserTokensRepository,
sendForgotPasswordEmail: SendForgotPasswordEmailService

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeMailProvider = new FakeMailProvider()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository)
  })

  it('Should be able to recover its password using its email', async () => {
    const sendMailSpy = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUsersRepository.create({
      email: 'test@email.com',
      name: 'John Doe',
      password: '123'
    })
    await sendForgotPasswordEmail.execute({email:'test@email.com'})
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('Should be not be able to recover password from a non-existing user', async () => {
    const sendMailPromise =  sendForgotPasswordEmail.execute({email:'test@email.com'})
    await expect(sendMailPromise).rejects.toBeInstanceOf(AppError)
  })

  it('Should generate a forgot password token', async () => {
    const generateTokenSpy = jest.spyOn(fakeUserTokensRepository, 'generate')
    const user = await fakeUsersRepository.create({
      email: 'test@email.com',
      name: 'John Doe',
      password: '123'
    })

    await sendForgotPasswordEmail.execute({email:'test@email.com'})
    expect(generateTokenSpy).toHaveBeenCalledWith(user.id)
  })
})
