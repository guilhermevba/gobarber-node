
import { startOfHour } from 'date-fns'
import {injectable, inject} from 'tsyringe'
import Appointment from '@appointments/infra/http/typeorm/entitites/Appointment'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import AppError from '@shared/errors/appError'

interface Request {
  provider_id: string,
  date: Date
}

@injectable()
class CreateAppointmentService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository){}

  public async execute({provider_id, date}: Request): Promise<Appointment> {

    const appointmentDate = startOfHour(date)

    const foundDate = await this.appointmentsRepository.findByDate(appointmentDate)
    if (foundDate) {
      throw new AppError('date is already booked')
    }

    const appointment = await this.appointmentsRepository.create({provider_id, date: appointmentDate})

    return appointment
  }
}

export default CreateAppointmentService
