import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import CreateUserService from './CreateUserService'
import AppError from '@shared/errors/appError'
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider'

let fakeUsersRepository: FakeUsersRepository,
fakeHashProvider: FakeHashProvider,
fakeCacheProvider: FakeCacheProvider,
createUserService: CreateUserService

describe('Create User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeCacheProvider = new FakeCacheProvider()
    createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider, fakeCacheProvider)
  })

  it('Should be able to create a new appointment', async () => {

    const user = await createUserService.execute({ password: '123', name: 'John', email: 'test@email.com'})
    expect(user).toHaveProperty('id')
    expect(user.name).toBe('John')

  })
  it('Should not allow to create more than one user with same email', async () => {

    await createUserService.execute({ password: '123', name: 'John', email: 'test@email.com'})
    await expect(
      createUserService.execute({ password: '123', name: 'Peter', email: 'test@email.com'})
    ).rejects.toBeInstanceOf(AppError)
  })
})
