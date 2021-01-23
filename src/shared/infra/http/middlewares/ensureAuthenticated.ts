import {Request, Response, NextFunction} from 'express'
import {verify} from 'jsonwebtoken'
import authConfig from '@config/auth'
import AppError from '@shared/errors/appError'

interface tokenPayload {
  iat: number,
  exp: number,
  sub: string
}

export default  (request: Request, response: Response, next: NextFunction): void => {
  const { authorization } = request.headers
  if (!authorization) {
    throw new AppError('Missing JWT token', 401)
  }

  const [, token] = authorization.split(' ')

  try{
    const decoded = verify(token, authConfig.jwt.secret) as tokenPayload

    const { sub } = decoded

    request.user = {
      id: sub
    }

    next()
  } catch {
    throw new AppError('Invalid JWT token', 401)
  }
}
