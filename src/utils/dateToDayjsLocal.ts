import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function dateToDayjsLocal(date: string) {
  return dayjs.utc(date).local()
}
