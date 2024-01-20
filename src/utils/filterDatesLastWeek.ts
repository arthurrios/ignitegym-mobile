import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(isoWeek)
dayjs.extend(customParseFormat)

export function filterDatesLastWeek(dates: string[]) {
  const currentDate = dayjs()
  const startOfCurrentWeek = currentDate.startOf('isoWeek')
  const endOfCurrentWeek = currentDate.endOf('isoWeek')

  const startOfLastWeek = startOfCurrentWeek.subtract(1, 'week')
  const endOfLastWeek = endOfCurrentWeek.subtract(1, 'week')

  return dates.map((date) => dayjs(date))
  // .filter(
  //   (date) => date.isAfter(startOfLastWeek) && date.isBefore(endOfLastWeek),
  // )
  // .map((date) => date.toISOString())
}
