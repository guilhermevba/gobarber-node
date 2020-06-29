
import { getCustomRepository} from 'typeorm'
import Appointment from '../appointment.model'
import AppointmentsRepository from '../appointment.repository'
import { startOfHour } from 'date-fns'

interface Request {
  provider: string,
  date: Date
}

class CreateAppointmentService {
  public async execute({provider, date}: Request): Promise<Appointment> {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointmentDate = startOfHour(date)

    const foundDate = await appointmentsRepository.findByDate(appointmentDate)
    if (foundDate) {
      throw new Error('date is already booked')
    }

    const appointment = appointmentsRepository.create({provider, date: appointmentDate})

    await appointmentsRepository.save(appointment)
    return appointment
  }
}

export default CreateAppointmentService
