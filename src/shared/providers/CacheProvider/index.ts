
import {container} from 'tsyringe'
import mailConfig from '@config/mail'
import ICacheProvider from './models/ICacheProvider'

import RedisCacheProvider from './implementations/RedisCacheProvider'

const providers = {
  redis: container.resolve(RedisCacheProvider)
}

container.registerInstance<ICacheProvider>('CacheProvider', providers.redis)
