import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@users/providers/HashProvider/fakes/FakeHashProvider'
import CreateUserService from './CreateUserService'
import AppError from '@shared/errors/appError'
import AuthenticateUserService from './AuthenticateUserService'

describe('Authenticate User', () => {
  it('Should be able to authenticate a valid user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    const user = await createUserService.execute({ password: '123', name: 'John', email: 'test@email.com'})
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)
    const response = await authenticateUserService.execute({email:'test@email.com', password: '123'})
    expect(response).toHaveProperty('token')
    expect(response).toHaveProperty('user')
    expect(response.user).toEqual(user)
  })
  it('Should not authenticate with a wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    await createUserService.execute({ password: '123', name: 'John', email: 'test@email.com'})
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)
    const authenticationPromise = authenticateUserService.execute({email:'test@email.com', password: '333'})
    await expect(authenticationPromise).rejects.toBeInstanceOf(AppError)
  })
  it('Should not authenticate an unexistent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)
    const authenticationPromise = authenticateUserService.execute({email:'test@email.com', password: '123'})
    await expect(authenticationPromise).rejects.toBeInstanceOf(AppError)
  })
})
