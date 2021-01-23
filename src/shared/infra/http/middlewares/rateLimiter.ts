import Redis from 'ioredis'
import { Request, Response, NextFunction } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import cacheConfig from '@config/cache'
import AppError from '@shared/errors/appError'

const redis = new Redis(cacheConfig.config.redis)
const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1
})
export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await rateLimiter.consume(req.ip)
    next()
  } catch(err) {
    throw new AppError('Too many requests', 429)
  }
}
