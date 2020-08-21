import FakeAppointmentsRepository from '@appointments/repositories/fake/FakeAppointmentsRepository'
import FakeUsersRepository from '@users/repositories/fakes/FakeUsersRepository'
import ListProviderAppointmentsService from './ListProviderAppointmentsService'

let listProviderAppointmentsService: ListProviderAppointmentsService,
fakeAppointmentsRepository: FakeAppointmentsRepository,
fakeUsersRepository: FakeUsersRepository

describe('List provider appointments', () => {
  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderAppointmentsService = new ListProviderAppointmentsService(fakeAppointmentsRepository)
  })

  it('Should be able to list the provider`s appointments for the given date', async () => {
    const provider = await fakeUsersRepository.create({
      email: 'provider@email.com',
      name: 'provider',
      password: '123'
    })
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: provider.id,
      user_id: 'user',
      date: new Date(2020, 10, 1, 10)
    })
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: provider.id,
      user_id: 'user',
      date: new Date(2020, 10, 1, 13)
    })

    const agenda = await listProviderAppointmentsService.execute({
      provider_id: provider.id,
      day: 1,
      month: 11,
      year: 2020
    })

    expect(agenda).toEqual(expect.arrayContaining([appointment1, appointment2]))

  })
})
