import FakeAppointmentRepository from '../repositories/fake/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'
import AppError from '@shared/errors/appError'
import FakeUsersRepository from '@users/repositories/fakes/FakeUsersRepository'
import User from '@users/infra/http/typeorm/entities/User'
import FakeNotificationsRepository from '@notifications/repositories/fakes/FakeNotificationsRepository'

let fakeAppointmentRepository: FakeAppointmentRepository,
fakeUsersRepository: FakeUsersRepository,
fakeNotificationsRepository: FakeNotificationsRepository,
createAppointmentService: CreateAppointmentService,
user: User,
provider: User


describe('Create Appointment', () => {
  beforeEach(async () => {
    fakeAppointmentRepository = new FakeAppointmentRepository()
    fakeUsersRepository = new FakeUsersRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()
    createAppointmentService = new CreateAppointmentService(fakeAppointmentRepository, fakeUsersRepository, fakeNotificationsRepository)

    user = await fakeUsersRepository.create({
      name: 'guilherme',
      email: 'guilherme@email.com',
      password: '123456'
    })
    provider = await fakeUsersRepository.create({
      name: 'juca',
      email: 'juca@email.com',
      password: '123456'
    })
    jest.spyOn(Date, 'now').mockImplementationOnce(() =>{
      return new Date(2020, 10, 20).getTime()
    })


  })

  it('Should be able to create a new appointment', async () => {
    const date = new Date(2020, 10, 21, 11, 0)

    const appointment = await createAppointmentService.execute({
      provider_id: provider.id,
      user_id: user.id,
      date
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe(provider.id)

  })
  it('Should not be able to create two appointments on same date with same provider', async () => {
    const appointmentDate = new Date(2020, 10, 21, 11)
    await createAppointmentService.execute({ provider_id: provider.id, user_id: user.id, date: appointmentDate})
    await expect(
      createAppointmentService.execute({ provider_id: provider.id, user_id: user.id, date: appointmentDate})
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create appointment with self', async () => {
    const date = new Date(2021, 10, 21, 11)
    const appointmentPromise = createAppointmentService.execute({provider_id: user.id, user_id: user.id, date})
    await expect(appointmentPromise).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create appointment with non existent user', async () => {

    const date = new Date(2020, 10, 21, 11)
    const appointmentPromise = createAppointmentService.execute({provider_id: 'non-existing-user', user_id: user.id, date})
    await expect(appointmentPromise).rejects.toBeInstanceOf(AppError)
  })

  it('Should be not be able to crete an appointment in the past', async () => {
    const appointmentDate = new Date(2020, 10, 15, 11)
    const appointmentPromise = createAppointmentService.execute({provider_id: provider.id, user_id: user.id, date: appointmentDate})
    await expect(appointmentPromise).rejects.toBeInstanceOf(AppError)
  })

  it('Should be able to create an appoitment before of 8h ', async () => {
    const appointmentDate = new Date(2020, 10, 21, 6)
    const appointmentPromise = createAppointmentService.execute({provider_id: provider.id, user_id: user.id, date: appointmentDate})
    await expect(appointmentPromise).rejects.toBeInstanceOf(AppError)
  })

  it('Should be able to create an appoitment after of 17h ', async () => {
    const appointmentDate = new Date(2020, 10, 21, 18)
    const appointmentPromise = createAppointmentService.execute({provider_id: provider.id, user_id: user.id, date: appointmentDate})
    await expect(appointmentPromise).rejects.toBeInstanceOf(AppError)
  })
})
