import FakeUsersRepository from '@users/repositories/fakes/FakeUsersRepository'
import ListProvidersService from './ListProvidersService'
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider'

let fakeUsersRepository: FakeUsersRepository,
fakeCacheProvider: FakeCacheProvider,
listProvidersService: ListProvidersService

describe('List providers', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeCacheProvider = new FakeCacheProvider()
    listProvidersService = new ListProvidersService(fakeUsersRepository, fakeCacheProvider)
  })

  it('Should be able to list all users except the one with given ID', async () => {
    const currentUser = await fakeUsersRepository.create({
      name:'john A.',
      email:'john@gmail.com',
      password:'123456'
    })

    await fakeUsersRepository.create({
      name:'Pablo',
      email:'pablito@gmail.com',
      password:'123456'
    })

    await fakeUsersRepository.create({
      name:'Snake',
      email:'snake@gmail.com',
      password:'123456'
    })
    const showUsers = await listProvidersService.execute({except_user_id: currentUser.id})
    expect(showUsers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({name: 'Pablo'}),
        expect.objectContaining({name: 'Snake'})
      ])
    )
  })
})
