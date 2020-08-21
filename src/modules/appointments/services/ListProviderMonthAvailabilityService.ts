
import {inject, injectable} from 'tsyringe'
import {getDaysInMonth, getDate, isAfter, getMonth} from 'date-fns'
import IAppointmentsRepository from '@appointments/repositories/IAppointmentsRepository';
import Appointment from '@appointments/infra/http/typeorm/entities/appointment'

interface Request{
  provider_id: string,
  month: number,
  year: number
}

type IResponse = Array<{
  day: number,
  available: boolean
}>;

const checkIfAvaliable = (appointments: Appointment[]) => (day: number) => {
  const today = getDate(Date.now())
  return (
    isAfter(day, today) &&
    appointments.filter(({date}) => getDate(date) === day).length < 10
  )
}

@injectable()
export default class ListProviderMonthAvailabilityService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository : IAppointmentsRepository
  ) {}

  public async execute({provider_id, month, year}: Request): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInMonthOfProvider({
      provider_id, month, year
    })
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month -1, 1))
    const availability = []

    const dayIsAvailable = checkIfAvaliable(appointments)
    const thisMonth = getMonth(Date.now())
    for (let day = 1; day <= numberOfDaysInMonth; day ++) {
      availability.push({
        day,
        available: isAfter(month, thisMonth) && dayIsAvailable(day)
      })
    }
    return availability
  }
}
