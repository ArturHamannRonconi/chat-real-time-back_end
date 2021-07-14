import dayjs from 'dayjs'

import IDateProvider from '@shared/container/providers/interfaces/IDateProvider'

class DayjsDateProvider implements IDateProvider
{
  public now(): Date
  {
    return dayjs().toDate()
  }

  public addDays(amount: number): Date
  {
    return dayjs().add(amount, 'd').toDate()
  }

  public addMinutes(amount: number): Date
  {
    return dayjs().add(amount, 'm').toDate()
  }
}

export default DayjsDateProvider