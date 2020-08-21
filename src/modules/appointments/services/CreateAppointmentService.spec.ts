import FakeAppointmentRepository from '../repositories/fake/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'
import AppError from '@shared/errors/appError'
let fakeAppointmentRepository: FakeAppointmentRepository,
createAppointmentService: CreateAppointmentService

describe('Create Appointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()
    createAppointmentService = new CreateAppointmentService(fakeAppointmentRepository)

  })

  it('Should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({ provider_id: '001', user_id: 'user', date: new Date()})
    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('001')

  })
  it('Should not be able to create two appointments on same date', async () => {
    const appointmentDate = new Date(2020,4, 12, 11)
    await createAppointmentService.execute({ provider_id: '001', user_id: 'user', date: appointmentDate})
    await expect(
      createAppointmentService.execute({ provider_id: '002', user_id: 'user', date: appointmentDate})
    ).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create appointment with self', async () => {
    const date = new Date(2020, 5, 12, 11)
    const appointmentPromise = createAppointmentService.execute({provider_id: 'user', user_id: 'user', date})
    await expect(appointmentPromise).rejects.toBeInstanceOf(AppError)
  })
})
