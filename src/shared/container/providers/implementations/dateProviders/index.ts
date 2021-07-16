import { container } from 'tsyringe'

import DayjsDateProvider from '@shared/container/providers/implementations/dateProviders/DayjsDateProvider'
import IDateProvider from '@shared/container/providers/interfaces/IDateProvider'

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider)