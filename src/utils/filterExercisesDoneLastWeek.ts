import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO'
import { api } from '@services/api'
import { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { tagExercisesDoneLastWeek } from '@notifications/notificationTags'

dayjs.extend(isoWeek)
dayjs.extend(customParseFormat)

export async function filterExercisesDoneLastWeek() {
  const response: AxiosResponse<HistoryByDayDTO[]> = await api.get('/history')
  const { data } = response

  const allExercisesDates = data
    .map((day) => day.data.map((exerciseDay) => exerciseDay.created_at))
    .flat()

  const currentDate = dayjs()
  const startOfCurrentWeek = currentDate.startOf('isoWeek')
  const endOfCurrentWeek = currentDate.endOf('isoWeek')

  const startOfLastWeek = startOfCurrentWeek.subtract(1, 'week')
  const endOfLastWeek = endOfCurrentWeek.subtract(1, 'week')

  const filteredExercises = allExercisesDates
    .map((date) => dayjs(date))
    .filter(
      (date) => date.isAfter(startOfLastWeek) && date.isBefore(endOfLastWeek),
    )

  tagExercisesDoneLastWeek(filteredExercises.length.toString())
}
