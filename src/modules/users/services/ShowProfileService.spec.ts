import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@users/providers/HashProvider/fakes/FakeHashProvider'
import ShowProfileService from './ShowProfileService'
import AppError from '@shared/errors/appError'
import User from '@users/infra/http/typeorm/entities/User'

let fakeUsersRepository: FakeUsersRepository,
showProfileService: ShowProfileService,
user: User

describe('Update User`s avatar', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()
    showProfileService = new ShowProfileService(fakeUsersRepository)
    user = await fakeUsersRepository.create({
      name:'john A.',
      email:'john@gmail.com',
      password:'123456'
    })
  })

  it('Should be able to show user giving its ID', async () => {
    const showUser = await showProfileService.execute({
      user_id: user.id
    })

    expect(showUser).toHaveProperty('name')
    expect(showUser).toHaveProperty('email')
    expect(showUser).not.toHaveProperty('password')
  })
  it('Should not be able to show profile if user_id is wrong', async () => {
    const showUserPromise =  showProfileService.execute({
      user_id: 'wrong-id'
    })

    expect(showUserPromise).rejects.toBeInstanceOf(AppError)
  })
})
