// src/routes/index.ts
import { Router } from 'express';
import appointmentsRouter from '../appointments/appointments.routes';
import usersRouter from  '../users/users.routes';
import sessionsRouter from '../sessions/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

export default routes;
