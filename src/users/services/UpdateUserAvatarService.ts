
import {getRepository} from 'typeorm'
import path from 'path'
import fs from 'fs'
import User from '../users.model'
import uploadConfig from '../../config/upload'

interface Request{
  user_id: string,
  avatarFilename: string
}

export default class UpdateUserAvatarService {
  public async execute({user_id, avatarFilename}: Request): Promise<User> {
    const usersRepository = getRepository(User)
    const user = await usersRepository.findOne({where: {id: user_id}})
    if (!user) {
      throw new Error('User not found')
    }

    if (user.avatar) {
      const userAvatarPath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarPath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarPath)
      }
    }
    user.avatar = avatarFilename

    await usersRepository.save(user)

    return user
  }
}
