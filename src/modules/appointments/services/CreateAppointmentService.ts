
import { startOfHour, isAfter, getHours, format } from 'date-fns'
import { injectable, inject } from 'tsyringe'
import Appointment from '@appointments/infra/http/typeorm/entities/appointment'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import AppError from '@shared/errors/appError'
import IUsersRepository from '@users/repositories/IUsersRepository'
import INotificationsRepository from '@notifications/repositories/INotificationsRepository'
import appointmentsRouter from '@appointments/infra/http/appointments.routes'

interface Request {
  provider_id: string,
  user_id: string,
  date: Date
}

@injectable()
class CreateAppointmentService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository){}

  public async execute({provider_id, user_id, date}: Request): Promise<Appointment> {

    const appointmentDate = startOfHour(date)

    if (provider_id === user_id) {
      throw new AppError('Is forbidden to book an appointment with self')
    }

    if (isAfter(Date.now(), date)) {
      throw new AppError('Appointments in the past are not allowed')
    }

    const appointmentHour = getHours(date)
    if (appointmentHour < 8 || appointmentHour > 17) {
      throw new AppError('Appointments can only be booked from 8h to 17h')
    }

    const provider = await this.usersRepository.findById(provider_id)
    if (!provider) {
      throw new AppError('Provider not found')
    }

    const foundDate = await this.appointmentsRepository.findByProviderAndDate({
      providerId: provider_id,
      date: appointmentDate
    })

    if (foundDate) {
      throw new AppError(`This provider is already booked for this date: ${date}`)
    }
    const appointment = await this.appointmentsRepository.create({provider_id, user_id, date: appointmentDate})

    const formatedDate = format(appointment.date, "dd/MM/yyyy 'às' HH:mm'h'")
    await this.notificationsRepository.create({
      recipient_id: appointment.provider_id,
      content: `Novo agendamento para ${formatedDate}`
    })
    return appointment
  }
}

export default CreateAppointmentService
