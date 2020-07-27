
import {getRepository} from 'typeorm'
import path from 'path'
import fs from 'fs'
import User from '../infra/typeorm/entities/users.model'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/appError'
import IUsersRepository from '@users/repositories/IUsersRepository'
import {inject, injectable} from 'tsyringe'

interface Request{
  user_id: string,
  avatarFilename: string
}

@injectable()
export default class UpdateUserAvatarService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
    ) {}

  public async execute({user_id, avatarFilename}: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id)
    if (!user) {
      throw new AppError('User not found', 401)
    }

    if (user.avatar) {
      const userAvatarPath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarPath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarPath)
      }
    }
    user.avatar = avatarFilename

    await this.usersRepository.update(user)

    return user
  }
}
