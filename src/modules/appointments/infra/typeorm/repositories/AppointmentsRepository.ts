import {getRepository, Repository, Between} from 'typeorm'
import Appointment from '../entitites/Appointment'
import IAppointmentsRepository from '@appointments/repositories/IAppointmentsRepository'
import createAppointmentDTO from '@appointments/dto/ICreateAppointmentDTO'
import IFindAllInMonthOfProviderDTO from '@appointments/dto/IFindAllInMonthOfProviderDTO'
import IFindAllInDayOfProviderDTO from '@appointments/dto/IFindAllInDayOfProviderDTO'

export default class AppointmentRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor(){
    this.ormRepository = getRepository(Appointment)
  }

  public async create({provider_id, date}: createAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({provider_id, date});
    await this.ormRepository.save(appointment);
    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {

    const findAppointment = await this.ormRepository.findOne({
      where: { date }
    })
    return findAppointment
  }

  public async findAllInMonthOfProvider({provider_id, month, year}: IFindAllInMonthOfProviderDTO): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Between(new Date(year, month-1, 1), new Date(year, month, 0))
      }

    })
    return appointments
  }

  public async findAllInDayOfProvider({provider_id, month, year, day}: IFindAllInDayOfProviderDTO): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Between(new Date(year, month-1, day, 0, 0), new Date(year, month, day + 1, 0, 0, -1 ))
      }

    })
    return appointments
  }
}

