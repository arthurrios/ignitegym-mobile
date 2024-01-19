import { OneSignal } from 'react-native-onesignal'

export function tagDaysNotWorkingOut(daysCount: string) {
  OneSignal.User.addTag('days_since_last_exercise', daysCount)
}

export function tagNewExercisesAdded(areExercisesDifferent: boolean) {
  OneSignal.User.addTag(
    'new_exercises',
    areExercisesDifferent ? 'true' : 'false',
  )
}
