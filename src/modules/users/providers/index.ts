import { container } from 'tsyringe'


import IHashProvider from './HashProvider/models/IHashProvider'
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider'
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)


import IStorageProvider from './StorageProvider/models/IStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'
container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider)
