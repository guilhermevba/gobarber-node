// src/routes/index.ts
import { Router } from 'express';
import appointmentsRouter from '@appointments/infra/http/appointments.routes';
import usersRouter from  '@users/infra/http/users.routes';
import sessionsRouter from '@users/infra/http/sessions.routes';
import passwordRoutes from '@users/infra/http/password.routes';
const routes = Router();

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRoutes)

export default routes;
