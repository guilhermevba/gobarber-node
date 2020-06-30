import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository} from 'typeorm'
import AppointmentsRepository from './appointments.repository'
import CreateAppointmentService from './services/CreateAppointmentService'


const appointmentsRouter = Router()

appointmentsRouter.post('/', async (req, res) => {
  try{
    const { provider, date } = req.body
    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.execute({provider, date: parsedDate})
    res.send(appointment)
  } catch (err) {
    return res.status(400).json({error: err.message})
  }

})

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find()
  res.json(appointments)
})

export default appointmentsRouter
