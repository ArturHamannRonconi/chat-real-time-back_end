
interface IDateProvider
{
  now(): Date
  addDays(amount: number): Date
  addMinutes(amount: number): Date
}

export default IDateProvider