import Appointment from './appointment.model'
import { isEqual } from 'date-fns'

interface CreateAppointmentDTO {
  provider: string,
  date: Date
}

class Repository {
  private appointments: Appointment[]
  constructor() {
    this.appointments = []
  }

  public create(data: CreateAppointmentDTO): Appointment {
    const {provider, date} = data
    const appointment = new Appointment({provider, date})
    this.appointments.push(appointment)

    return appointment
  }

  public findByDate(qDate: Date): Appointment | null {
    const found = this.appointments.find(({date}) => isEqual(date, qDate))

    return found || null
  }

  public all(): Appointment[] {
    return this.appointments
  }
}

export default Repository
