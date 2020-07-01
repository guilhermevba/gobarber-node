
import { getCustomRepository} from 'typeorm'
import Appointment from '../appointments.model'
import { startOfHour } from 'date-fns'
import AppointmentsRepository from '../appointments.repository'

interface Request {
  provider_id: string,
  date: Date
}

class CreateAppointmentService {
  public async execute({provider_id, date}: Request): Promise<Appointment> {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointmentDate = startOfHour(date)

    const foundDate = await appointmentsRepository.findByDate(appointmentDate)
    if (foundDate) {
      throw new Error('date is already booked')
    }

    const appointment = appointmentsRepository.create({provider_id, date: appointmentDate})

    await appointmentsRepository.save(appointment)
    return appointment
  }
}

export default CreateAppointmentService
