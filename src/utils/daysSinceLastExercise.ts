import { tagDaysNotWorkingOut } from '@notifications/notificationTags'
import { api } from '@services/api'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export async function daysSinceLastExercise() {
  const { data } = await api.get('/history')

  const lastExerciseDate = dayjs
    .utc(data[0].data[0].created_at)
    .local()
    .valueOf()

  const currentDate = dayjs().valueOf()

  const timeElapsed = currentDate - lastExerciseDate
  const daysCount = Math.floor(timeElapsed / (24 * 60 * 60 * 1000))

  tagDaysNotWorkingOut(daysCount.toString())
}
