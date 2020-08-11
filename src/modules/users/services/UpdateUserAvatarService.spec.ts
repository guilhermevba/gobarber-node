import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@users/providers/HashProvider/fakes/FakeHashProvider'
import UpdateUserAvatarService from './UpdateUserAvatarService'
import FakeStorageProvider from '@users/providers/StorageProvider/fake/FakeStorageProvider'
import CreateUserService from './CreateUserService'
import AppError from '@shared/errors/appError'

describe('Update User`s avatar', () => {
  it('Should be able to add avatar to a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()
    const fakeHashProvider = new FakeHashProvider()
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    const updateAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider)


    const user = await createUserService.execute({name: 'John', email: 'john@email.com', password: '1234'})
    await updateAvatarService.execute({ user_id: user.id, avatarFilename: 'usersavatarfilename'})
    expect(user.avatar).toEqual('usersavatarfilename')

  })
  it('Should be able to replace user´s avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')
    const fakeHashProvider = new FakeHashProvider()
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider)
    const updateAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider)

    const user = await createUserService.execute({name: 'John', email: 'john@email.com', password: '1234'})
    await updateAvatarService.execute({ user_id: user.id, avatarFilename: 'usersavatarfilename'})
    await updateAvatarService.execute({ user_id: user.id, avatarFilename: 'newavatarfilename'})
    expect(deleteFile).toHaveBeenCalledWith('usersavatarfilename')
    expect(user.avatar).toEqual('newavatarfilename')
  })
  it('Should not be able to set avatar of an unexistent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()
    const updateAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider)

    const promiseUpdate = updateAvatarService.execute({ user_id: '123', avatarFilename: 'usersavatarfilename'})
    await expect(promiseUpdate).rejects.toBeInstanceOf(AppError)
  })
})
