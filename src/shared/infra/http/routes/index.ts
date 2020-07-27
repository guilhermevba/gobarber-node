// src/routes/index.ts
import { Router } from 'express';
import appointmentsRouter from '@appointments/infra/http/appointments.routes';
import usersRouter from  '@users/infra/http/users.routes';
import sessionsRouter from '@users/infra/http/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

export default routes;
