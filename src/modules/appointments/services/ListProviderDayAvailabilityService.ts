
import {inject, injectable} from 'tsyringe'
import {getHours, isAfter } from 'date-fns'
import IAppointmentsRepository from '@appointments/repositories/IAppointmentsRepository';
import Appointment from '@appointments/infra/http/typeorm/entities/appointment'

interface Request{
  provider_id: string,
  day: number,
  month: number,
  year: number
}

type IResponse = Array<{
  hour: number,
  available: boolean
}>;

const CheckAvailability = (now: number, appointments: Appointment[], day: number, month: number, year: number, hour = 8): IResponse => {
  const available = isAfter(new Date(year, month, day, hour, 0), now) && !appointments.some(({date}) => getHours(date) === hour)
  if (hour === 17) {
    return [{
      hour,
      available
    }]
  }
  return ([
    {
      hour,
      available
    }, ...CheckAvailability(now, appointments, day, month, year, ++hour)
  ])
}

@injectable()
export default class ListProviderDayAvailabilityService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository : IAppointmentsRepository
  ) {}

  public async execute({provider_id, day, month, year}: Request): Promise<IResponse> {

    const appointmentsOfDay = await this.appointmentRepository.findAllInDayOfProvider({
      provider_id, day, month, year
    })
    return CheckAvailability(Date.now(), appointmentsOfDay, day, month-1, year)
  }
}
