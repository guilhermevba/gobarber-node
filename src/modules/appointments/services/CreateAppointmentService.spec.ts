import FakeAppointmentRepository from '../repositories/fake/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'
import AppError from '@shared/errors/appError'
let fakeAppointmentRepository: FakeAppointmentRepository,
createAppointmentService: CreateAppointmentService

describe('Create Appointment', () => {
  beforeAll(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()
    createAppointmentService = new CreateAppointmentService(fakeAppointmentRepository)

  })

  it('Should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({ provider_id: '001', date: new Date()})
    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('001')

  })
  it('Should not be able to create two appointments on same date', async () => {
    const appointmentDate = new Date(2020,4, 12, 11)
    await createAppointmentService.execute({ provider_id: '001', date: appointmentDate})
    await expect(
      createAppointmentService.execute({ provider_id: '002', date: appointmentDate})
    ).rejects.toBeInstanceOf(AppError)
  })
})
