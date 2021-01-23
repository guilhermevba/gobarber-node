import {Secret} from 'jsonwebtoken'

interface IAuth {
  jwt: {
    secret: Secret,
    expiresIn: string
  }
}

export default {
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: '1d'
  }
} as IAuth
