import {container} from 'tsyringe'
import '@users/providers'
import '../providers'

import IAppointmentsRepository from '@appointments/repositories/IAppointmentsRepository'
import AppointmentsRepository from '@appointments/infra/typeorm/repositories/AppointmentsRepository'
container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository)

import IUsersRepository from '@users/repositories/IUsersRepository'
import UsersRepository from '@users/infra/http/typeorm/repositories/UsersRepository'
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)

import IUserTokensRepository from '@users/repositories/IUserTokensRepository'
import UserTokensRepository from '@users/infra/http/typeorm/repositories/UserTokensRepository'
container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository)
