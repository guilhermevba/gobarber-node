
import User from '../infra/http/typeorm/entities/User'
import AppError from '@shared/errors/appError'
import IUsersRepository from '@users/repositories/IUsersRepository'
import {inject, injectable} from 'tsyringe'
import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider'

interface Request{
  user_id: string,
  avatarFilename: string
}

@injectable()
export default class UpdateUserAvatarService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
    ) {}

  public async execute({user_id, avatarFilename}: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id)
    if (!user) {
      throw new AppError('User not found', 401)
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }
    const filename = await this.storageProvider.saveFile(avatarFilename)
    user.avatar = filename

    await this.usersRepository.update(user)

    return user
  }
}
