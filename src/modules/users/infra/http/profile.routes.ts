import { Router } from 'express'
import { celebrate, Segments, Joi} from 'celebrate'
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController'
import { string } from '@hapi/joi';

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.get('/', profileController.show)

profileRouter.put('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      new_password: Joi.string(),
      new_password_confirmation: Joi.string().valid(Joi.ref('new_password'))
    }
  }),
  profileController.update)

export default profileRouter
