import {container} from 'tsyringe'
import IStorageProvider from './models/IStorageProvider'
import storageConfig from '@config/upload'

import DiskStorage from './implementations/DiskStorageProvider'
import S3Storage from './implementations/S3StorageProvider'

const providers = {
  disk: DiskStorage,
  s3: S3Storage
}

container.registerSingleton<IStorageProvider>('StorageProvider', providers[storageConfig.driver])
