import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@users/providers/HashProvider/fakes/FakeHashProvider'
import UpdateProfileService from './UpdateProfileService'
import AppError from '@shared/errors/appError'
import User from '@users/infra/http/typeorm/entities/User'

let fakeUsersRepository: FakeUsersRepository,
fakeHashProvider: FakeHashProvider,
updateProfileService: UpdateProfileService,
user: User

describe('Update User`s avatar', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    updateProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider)
    user = await fakeUsersRepository.create({
      name:'john A.',
      email:'john@gmail.com',
      password:'123456'
    })
  })

  it('Should be able to update user Profile', async () => {
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      email: 'johna@gmail.com',
      name: 'John Austin',
      password: '123456',
      new_password: '333212'
    })

    expect(updatedUser?.email).toBe('johna@gmail.com')
    expect(updatedUser?.name).toBe('John Austin')
  })
  it('Should not be able to update password without passing current password', async () => {
    const updatePromise = updateProfileService.execute({
      user_id: user.id,
      email: 'johna@gmail.com',
      name: 'John Austin',
      new_password: '333212'
    })
    await expect(updatePromise).rejects.toBeInstanceOf(AppError)
  })
  it('Should not be able to update password passing wrong password', async () => {
    const updatePromise = updateProfileService.execute({
      user_id: user.id,
      email: 'johna@gmail.com',
      name: 'John Austin',
      password: 'wrong-pswd',
      new_password: '333212'
    })
    await expect(updatePromise).rejects.toBeInstanceOf(AppError)
  })
  it('Should not be able to update a non-existing user', async () => {
    const updatePromise = updateProfileService.execute({
      user_id: 'wrong-id',
      email: 'someemail@gmail.com',
      name: 'non existing user',
      new_password: '333212'
    })
    expect(updatePromise).rejects.toBeInstanceOf(AppError)
  })

  it('Should not allow update email to an existing email', async () => {
    const user_two = await fakeUsersRepository.create({
      name:'john C.',
      email:'anotherjohn@gmail.com',
      password:'123123'
    })
    const updatePromise = updateProfileService.execute({
      user_id: user_two.id,
      email: 'john@gmail.com',
      name: 'john C.'
    })

    await expect(updatePromise).rejects.toBeInstanceOf(AppError)
  })
})
