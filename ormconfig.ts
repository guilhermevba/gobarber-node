import Appointment from '@appointments/infra/http/typeorm/entities/appointment'
import User from '@users/infra/http/typeorm/entities/User'
import UserToken from '@users/infra/http/typeorm/entities/UserToken'
import Notification from '@notifications/infra/typeorm/schemas/notification'

module.exports = [
    {
    "name": "default",
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
  }, {
    "name": "mongo",
    "type": "mongodb",
    "port": 27017,
    "database": "gobarber",
    "useUnifiedTopology": true,
    "entities": [Notification]
  }
]
