
import {inject, injectable} from 'tsyringe'
import IAppointmentsRepository from '@appointments/repositories/IAppointmentsRepository';
import Appointment from '@appointments/infra/http/typeorm/entities/appointment'
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

interface Request{
  provider_id: string,
  day: number,
  month: number,
  year: number
}

@injectable()
export default class ListProviderAppointmentsService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository : IAppointmentsRepository,
    @inject('CacheProvider')
    private cacheProvider : ICacheProvider
  ) {}

  public async execute({provider_id, day, month, year}: Request): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`

    let appointments =  await this.cacheProvider.recover<Appointment[]>(cacheKey)
    if(!appointments) {
      appointments = await this.appointmentRepository.findAllInDayOfProvider({
        day,
        month,
        year,
        provider_id
      })
      appointments = classToClass(appointments)
      await this.cacheProvider.save(cacheKey, appointments)
    }
    return appointments
  }
}
