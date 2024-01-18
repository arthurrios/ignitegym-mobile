import { storageLastExerciseGet } from '@storage/storageLastExercise'
import { tagDaysNotWorkingOut } from '@notifications/notificationTags'

export async function daysSinceLastExercise() {
  const { date } = await storageLastExerciseGet()

  const currentDate = new Date().getTime()

  const timeElapsed = currentDate - date
  const daysCount = Math.floor(timeElapsed / (24 * 60 * 60 * 1000))

  tagDaysNotWorkingOut(daysCount.toString())
}
