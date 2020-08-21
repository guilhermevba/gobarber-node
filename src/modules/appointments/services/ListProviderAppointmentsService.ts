
import {inject, injectable} from 'tsyringe'
import IAppointmentsRepository from '@appointments/repositories/IAppointmentsRepository';
import Appointment from '@appointments/infra/http/typeorm/entities/appointment'

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
    private appointmentRepository : IAppointmentsRepository
  ) {}

  public async execute({provider_id, day, month, year}: Request): Promise<Appointment[]> {
    const providerAppointments = await this.appointmentRepository.findAllInDayOfProvider({
      day,
      month,
      year,
      provider_id
    })

    return providerAppointments
  }
}
