import { OneSignal } from 'react-native-onesignal'

export function tagDaysNotWorkingOut(daysCount: string) {
  OneSignal.User.addTag('days_since_last_exercise', daysCount)
}

export function tagExercisesDoneLastWeek(exercisesCount: string) {
  OneSignal.User.addTag('exercises_done_last_week', exercisesCount)
}
