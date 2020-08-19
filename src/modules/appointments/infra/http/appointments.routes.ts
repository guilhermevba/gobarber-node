import { Router } from 'express'
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'
import AppointmentsController from '../controllers/AppointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post('/', appointmentsController.create)

// appointmentsRouter.get('/', async (req, res) => {
//   const appointments = await appointmentsRepository.find()
//   res.json(appointments)
// })

export default appointmentsRouter
