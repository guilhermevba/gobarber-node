
import {inject, injectable} from 'tsyringe'
import {getDaysInMonth, getDate} from 'date-fns'
import IAppointmentsRepository from '@appointments/repositories/IAppointmentsRepository';
import Appointment from '@appointments/infra/http/typeorm/entitites/Appointment'

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
  return appointments.filter(({date}) => getDate(date) === day).length < 10
}

@injectable()
export default class ListPRoviderMonthAvailabilityService {

  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository : IAppointmentsRepository
  ) {}

  public async execute({provider_id, month, year}: Request): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInMonthOfProvider({
      provider_id, month, year
    })
    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month -1, 1))
    const availability = []

    const checkIfDayAvailable = checkIfAvaliable(appointments)
    for (let day = 1; day <= numberOfDaysInMonth; day ++) {
      availability.push({
        day,
        available: checkIfDayAvailable(day)
      })
    }
    return availability
  }
}
