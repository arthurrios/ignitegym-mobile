import { tagDaysNotWorkingOut } from '@notifications/notificationTags'
import { api } from '@services/api'
import dayjs from 'dayjs'
import { dateToDayjsLocal } from './dateToDayjsLocal'

export async function daysSinceLastExercise() {
  const { data } = await api.get('/history')

  const lastExerciseDate = dateToDayjsLocal(
    data[0].data[0].created_at,
  ).valueOf()

  const currentDate = dayjs().valueOf()

  const timeElapsed = currentDate - lastExerciseDate
  const daysCount = Math.floor(timeElapsed / (24 * 60 * 60 * 1000))

  tagDaysNotWorkingOut(daysCount.toString())
}
