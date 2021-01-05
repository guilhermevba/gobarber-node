import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@users/providers/HashProvider/fakes/FakeHashProvider'
import UpdateUserAvatarService from './UpdateUserAvatarService'
import FakeStorageProvider from '@shared/providers/StorageProvider/fake/FakeStorageProvider'
import AppError from '@shared/errors/appError'

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeHashProvider: FakeHashProvider;
let updateAvatarService: UpdateUserAvatarService;


describe('Update User`s avatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeStorageProvider = new FakeStorageProvider()
    fakeHashProvider = new FakeHashProvider()
    updateAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider)
  })

  it('Should be able to add avatar to a user', async () => {
    const user = await fakeUsersRepository.create({name: 'John', email: 'john@email.com', password: '1234'})
    await updateAvatarService.execute({ user_id: user.id, avatarFilename: 'usersavatarfilename'})
    expect(user.avatar).toEqual('usersavatarfilename')

  })
  it('Should be able to replace user´s avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const user = await fakeUsersRepository.create({name: 'John', email: 'john@email.com', password: '1234'})
    await updateAvatarService.execute({ user_id: user.id, avatarFilename: 'usersavatarfilename'})
    await updateAvatarService.execute({ user_id: user.id, avatarFilename: 'newavatarfilename'})
    expect(deleteFile).toHaveBeenCalledWith('usersavatarfilename')
    expect(user.avatar).toEqual('newavatarfilename')
  })
  it('Should not be able to set avatar of an unexistent user', async () => {
    const promiseUpdate = updateAvatarService.execute({ user_id: '123', avatarFilename: 'usersavatarfilename'})
    await expect(promiseUpdate).rejects.toBeInstanceOf(AppError)
  })
})
