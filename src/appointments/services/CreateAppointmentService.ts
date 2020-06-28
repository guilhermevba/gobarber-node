import Appointment from '../appointment.model'
import AppointmentsRepository from '../appointment.repository'
import { startOfHour } from 'date-fns'

interface Request {
  provider: string,
  date: Date
}

class CreateAppointmentService {

  private appointmentsRepository: AppointmentsRepository

  constructor(repository: AppointmentsRepository) {
    this.appointmentsRepository = repository
  }

  public execute({provider, date}: Request): Appointment {

    const appointmentDate = startOfHour(date)

    const foundDate = this.appointmentsRepository.findByDate(appointmentDate)
    if (foundDate) {
      throw new Error('date is already booked')
    }

    const appointment = this.appointmentsRepository.create({provider, date: appointmentDate})

    return appointment
  }
}

export default CreateAppointmentService
