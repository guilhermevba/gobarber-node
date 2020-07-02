import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'
import CreateUserService from './services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from './services/UpdateUserAvatarService';

const userRouter = Router()
const upload = multer(uploadConfig)

userRouter.post('/', async (request, response) => {
  try{
    const { name, email, password } = request.body
    const createUserService = new CreateUserService()
    const user = await createUserService.execute({name, email, password})
    delete user.password
    response.json(user)
  } catch(err) {
    response.status(400).json({error: err.message})
  }
})

userRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request , response) => {
 try{
  const updateUserAvatar = new UpdateUserAvatarService()
  const user = await updateUserAvatar.execute({user_id: request.user.id, avatarFilename: request.file.filename})

  delete user.password

  response.json({user})
 }catch (err) {
  response.status(400).json({message: err.message})
 }
})

export default userRouter
