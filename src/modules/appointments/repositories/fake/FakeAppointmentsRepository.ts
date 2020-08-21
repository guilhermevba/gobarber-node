import Appointment from '@appointments/infra/http/typeorm/entities/appointment'
import IAppointmentsRepository from '@appointments/repositories/IAppointmentsRepository'
import createAppointmentDTO from '@appointments/dto/ICreateAppointmentDTO'
import {uuid} from 'uuidv4'
import {isEqual, getMonth, getYear, getDate} from 'date-fns'
import IFindAllInMonthOfProviderDTO from '@appointments/dto/IFindAllInMonthOfProviderDTO'
import IFindAllInDayOfProviderDTO from '@appointments/dto/IFindAllInDayOfProviderDTO'
import IFindByProviderAndDateDTO from '@appointments/dto/IFindByProviderAndDateDTO'

export default class AppointmentRepository implements IAppointmentsRepository {

  private appointments: Appointment[] = []

  public async create({provider_id, user_id, date}: createAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()
    Object.assign(appointment, {id: uuid(), provider_id, user_id, date})

    this.appointments.push(appointment)
    return appointment
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find((appointment) => isEqual(appointment.date, date))
    return appointment
  }

  public async findByProviderAndDate({date, providerId}: IFindByProviderAndDateDTO): Promise<Appointment | undefined> {
    const appointment = this.appointments.find((appointment) => isEqual(appointment.date, date) && appointment.provider_id === providerId)
    return appointment
  }

  public async findAllInMonthOfProvider({provider_id, month, year}: IFindAllInMonthOfProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return appointment.provider_id === provider_id &&
      getMonth(appointment.date) + 1 === month &&
      getYear(appointment.date) === year
    })
    return appointments
  }
  public async findAllInDayOfProvider({provider_id, month, year, day}: IFindAllInDayOfProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return appointment.provider_id === provider_id &&
      getDate(appointment.date) === day &&
      getMonth(appointment.date) + 1 === month &&
      getYear(appointment.date) === year
    })
    return appointments
  }
}

