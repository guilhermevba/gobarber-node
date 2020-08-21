import Appointment from './src/modules/appointments/infra/http/typeorm/entities/appointment'
import User from './src/modules/users/infra/http/typeorm/entities/User'
import UserToken from './src/modules/users/infra/http/typeorm/entities/UserToken'


module.exports = {
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "gostack",
  "database": "gobarber",
  "migrations": [
    "./src/shared/infra/typeorm/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  },
  "entities": [Appointment, User, UserToken]
}
