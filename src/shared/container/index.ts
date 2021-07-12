import { container } from 'tsyringe'

import UserRepository from '@accounts/repositories/implementations/UserRepository'
import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)