import {EntityRepository, Repository} from 'typeorm'
import Appointment from './appointment.model'


@EntityRepository(Appointment)
export default class AppointmentRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {

    const findAppointment = await this.findOne({
      where: { date }
    })
    return findAppointment || null
  }
}

