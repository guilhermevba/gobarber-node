import {Request, Response, NextFunction} from 'express'
import {verify} from 'jsonwebtoken'
import authConfig from '../config/auth'

interface tokenPayload {
  iat: number,
  exp: number,
  sub: string
}


export default  (request: Request, response: Response, next: NextFunction): void => {
  const { authorization } = request.headers
  if (!authorization) {
    throw new Error('Missing JWT token')
  }

  const [, token] = authorization.split(' ')

  try{
    const decoded = verify(token,authConfig.jwt.secret) as tokenPayload

    const { sub } = decoded

    request.user = {
      id: sub
    }

    next()
  } catch {
    throw new Error('Invalid JWT token')
  }
}
