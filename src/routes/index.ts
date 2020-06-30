// src/routes/index.ts
import { Router } from 'express';
import appointmentsRouter from '../appointments/appointments.routes';
import usersRouter from  '../users/users.routes';
const routes = Router();

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
export default routes;
