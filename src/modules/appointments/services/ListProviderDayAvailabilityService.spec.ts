import FakeAppointmentsRepository from '@appointments/repositories/fake/FakeAppointmentsRepository'
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'

let listProviderDayAvailabilityService: ListProviderDayAvailabilityService,
fakeAppointmentsRepository: FakeAppointmentsRepository

describe('List provider day availability', () => {
  beforeEach(async () => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(fakeAppointmentsRepository)
  })

  it('Should be able to list the day availability of provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 9).getTime()
    })
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      user_id: 'user',
      date: new Date(2020, 5, 10, 8, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      user_id: 'user',
      date: new Date(2020, 5, 10, 9, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      user_id: 'user',
      date: new Date(2020, 5, 10, 13, 0)
    })

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: '1',
      day: 10,
      month: 6,
      year: 2020
    })

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false},
      { hour: 9, available: false},
      { hour: 10, available: true},
      { hour: 11, available: true},
      { hour: 12, available: true},
      { hour: 13, available: false},
      { hour: 14, available: true},
      { hour: 15, available: true},
      { hour: 16, available: true},
      { hour: 17, available: true},
    ]))
  })

  it('Should not show the past as available to book an appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 11, 0).getTime()
    })

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'does not matter',
      day: 10,
      month: 6,
      year: 2020
    })

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false},
      { hour: 9, available: false},
      { hour: 10, available: false},
      { hour: 11, available: false},
      { hour: 12, available: true},
      { hour: 13, available: true}
    ]))
  }
)})
