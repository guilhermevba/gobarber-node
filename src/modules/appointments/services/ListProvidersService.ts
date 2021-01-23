
import User from '@users/infra/http/typeorm/entities/User'
import IUsersRepository from '@users/repositories/IUsersRepository'
import {inject, injectable} from 'tsyringe'
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider'

interface Request{
  except_user_id: string
}

@injectable()
export default class ListProvidersService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({except_user_id}: Request): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(`providers-list:${except_user_id}`)
    if(!users) {
      users = await this.usersRepository.findAllUsers({except_user_id})

      users.forEach(user => {
        delete user.password
      })
      console.log('query executed')
      await this.cacheProvider.save(`providers-list:${except_user_id}`, users)
    }
    return users
  }
}
