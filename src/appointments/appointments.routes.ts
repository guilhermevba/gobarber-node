import { Router } from 'express'
import { parseISO } from 'date-fns'
import AppointmentsRepository from './appointment.repository'
import CreateAppointmentService from './services/CreateAppointmentService'

const appointmentsRepository = new AppointmentsRepository()

const appointmentsRouter = Router()

appointmentsRouter.post('/', (req, res) => {
  try{
  const { provider, date } = req.body
  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService(appointmentsRepository)

    const appointment = createAppointment.execute({provider, date: parsedDate})
    res.send(appointment)
  } catch (err) {
    return res.status(400).json({error: err.message})
  }

})

appointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentsRepository.all()
  res.json(appointments)
})

export default appointmentsRouter
