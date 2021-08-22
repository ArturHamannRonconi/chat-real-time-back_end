import { container } from 'tsyringe'

import '@shared/container/providers'

import UserRepository from '@accounts/repositories/implementations/UserRepository'
import IUserRepository from '@accounts/repositories/interfaces/IUserRepository'

import UserTokenRepository from '@accounts/repositories/implementations/UserTokenRepository'
import IUserTokenRepository from '@accounts/repositories/interfaces/IUserTokenRepository'

import ChatRoomRepository from '@chats/repositories/implementations/ChatRoomRepository'
import IChatRoomRepository from '@chats/repositories/interfaces/IChatRoomRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<IUserTokenRepository>('UserTokenRepository', UserTokenRepository)
container.registerSingleton<IChatRoomRepository>('ChatRoomRepository', ChatRoomRepository)