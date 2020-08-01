import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import CreateUserService from './CreateUserService'
import AppError from '@shared/errors/appError'

describe('Create User', () => {
  it('Should be able to create a new appointment', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    const user = await createUserService.execute({ password: '123', name: 'John', email: 'test@email.com'})
    expect(user).toHaveProperty('id')
    expect(user.name).toBe('John')

  })
  it('Should not allow to create more than one user with same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    await createUserService.execute({ password: '123', name: 'John', email: 'test@email.com'})
    expect(
      createUserService.execute({ password: '123', name: 'Peter', email: 'test@email.com'})
    ).rejects.toBeInstanceOf(AppError)
  })
})
