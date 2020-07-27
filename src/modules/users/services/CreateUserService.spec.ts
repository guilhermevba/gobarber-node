import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from './CreateUserService'
import AppError from '@shared/errors/appError'

describe('Create User', () => {
  it('Should be able to create a new appointment', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const createAppointmentService = new CreateUserService(fakeUsersRepository)
    const user = await createAppointmentService.execute({ password: '123', name: 'John', email: 'test@email.com'})
    expect(user).toHaveProperty('id')
    expect(user.name).toBe('John')

  })
  it('Should not allow to create more than one user with same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const createAppointmentService = new CreateUserService(fakeUsersRepository)
    await createAppointmentService.execute({ password: '123', name: 'John', email: 'test@email.com'})
    expect(
      createAppointmentService.execute({ password: '123', name: 'Peter', email: 'test@email.com'})
    ).rejects.toBeInstanceOf(AppError)
  })
})
