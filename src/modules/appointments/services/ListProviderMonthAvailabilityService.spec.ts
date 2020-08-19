import FakeAppointmentsRepository from '@appointments/repositories/fake/FakeAppointmentsRepository'
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService'

let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService,
fakeAppointmentsRepository: FakeAppointmentsRepository

describe('List provider month availability', () => {
  beforeEach(async () => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository)
  })

  it('Should be able to list the month availability of provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 7, 1, 8, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 7, 1, 9, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 7, 1, 10, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 7, 1, 11, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 7, 1, 12, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 7, 1, 13, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 7, 1, 14, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 7, 1, 15, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 7, 1, 16, 0, 0)
    })
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 7, 1, 17, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 7, 2, 8, 0, 0)
    })

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: '1',
      month: 8,
      year: 2020
    })

    expect(availability).toEqual(expect.arrayContaining([
      {day: 1, available: false},
      {day: 2, available: true},
      {day: 3, available: true}
    ]))

  })
})
