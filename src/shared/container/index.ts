import {container} from 'tsyringe'

import IAppointmentsRepository from '@appointments/repositories/IAppointmentsRepository'
import AppointmentsRepository from '@appointments/infra/typeorm/repositories/AppointmentsRepository'
container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository)

import IUsersRepository from '@users/repositories/IUsersRepository'
import UsersRepository from '@users/infra/typeorm/repositories/UsersRepository'
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
