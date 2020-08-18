import Appointment from '@appointments/infra/http/typeorm/entitites/Appointment'
import IAppointmentsRepository from '@appointments/repositories/IAppointmentsRepository'
import createAppointmentDTO from '@appointments/dto/ICreateAppointmentDTO'
import {uuid} from 'uuidv4'
import {isEqual} from 'date-fns'
export default class AppointmentRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async create({provider_id, date}: createAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()
    Object.assign(appointment, {id: uuid, provider_id, date})

    this.appointments.push(appointment)
    return appointment
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find((appointment) => isEqual(appointment.date, date))
    return appointment
  }
}

