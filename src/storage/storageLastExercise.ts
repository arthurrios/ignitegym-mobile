import AsyncStorage from '@react-native-async-storage/async-storage'

const LAST_EXERCISE_STORAGE = '@IGNITEGYM_LAST_EXERCISE_STORAGE'

export type StorageLastExerciseProps = {
  id: string
  date: Date
}

export async function storageLastExerciseGet() {
  const storage = await AsyncStorage.getItem(LAST_EXERCISE_STORAGE)
  const lastExercise: StorageLastExerciseProps = storage
    ? JSON.parse(storage)
    : {}

  return lastExercise
}

export async function storageLastExerciseSave(
  newExercise: StorageLastExerciseProps,
) {
  const lastExercise: StorageLastExerciseProps = await storageLastExerciseGet()

  if (lastExercise) {
    await AsyncStorage.removeItem(LAST_EXERCISE_STORAGE)
  }

  await AsyncStorage.setItem(LAST_EXERCISE_STORAGE, JSON.stringify(newExercise))
}
