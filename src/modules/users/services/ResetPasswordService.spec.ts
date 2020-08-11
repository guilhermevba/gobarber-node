import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeMailProvider from '@users/providers/MailProvider/fakes/FakeMailProvider'
import FakeUserTokensRepository from '@users/repositories/fakes/FakeUserTokensRepository'
import FakeHashProvider from '@users/providers/HashProvider/fakes/FakeHashProvider'
import ResetPasswordService from './ResetPasswordService'
import AppError from '@shared/errors/appError'

let fakeUsersRepository: FakeUsersRepository,
fakeMailProvider: FakeMailProvider,
fakeHashProvider: FakeHashProvider,
fakeUserTokensRepository: FakeUserTokensRepository,
resetPassword: ResetPasswordService

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeMailProvider = new FakeMailProvider()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeHashProvider = new FakeHashProvider()
    resetPassword = new ResetPasswordService(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider)
  })

  it('Should be able to reset the password ', async () => {
    const user = await fakeUsersRepository.create({
      email: 'test@email.com',
      name: 'John Doe',
      password: '123'
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    const generateHashSpy = jest.spyOn(fakeHashProvider, 'generateHash')

    await resetPassword.execute({
      token,
      password: '123456'
    })

    const updatedUser = await fakeUsersRepository.findById(user.id)
    const isHashed = await fakeHashProvider.compare('123456', updatedUser?.password || '')

    expect(generateHashSpy).toHaveBeenCalledWith('123456')
    expect(isHashed).toBe(true)
  })

  it('Should not be able to reset password with an invalid token', async () => {
    const resetPromise = resetPassword.execute({
      token: 'invalid-token',
      password: '123456'
    })
    await expect(resetPromise).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to reset password of an invalid user', async () => {
    const {token} = await fakeUserTokensRepository.generate('invalid-user')

    const resetPromise = resetPassword.execute({
      token,
      password: '123456'
    })
    await expect(resetPromise).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to reset the password with a token older than 2h', async () => {
    const user = await fakeUsersRepository.create({
      email: 'test@email.com',
      name: 'John Doe',
      password: '123'
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date()
      return customDate.setHours(customDate.getHours() + 2, customDate.getMinutes() + 1)
    })
    const resetPromise = resetPassword.execute({
      token,
      password: '123456'
    })

    await expect(resetPromise).rejects.toBeInstanceOf(AppError)
  })
})
