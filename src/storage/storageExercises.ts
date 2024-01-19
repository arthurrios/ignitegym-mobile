import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { tagNewExercisesAdded } from '@notifications/notificationTags'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { api } from '@services/api'
import { arraysHaveSameContent } from '@utils/arraysHaveTheSameContent'

export const EXERCISES = '@IGNITEGYM_EXERCISES'

export async function storageExercisesGet() {
  const storage = await AsyncStorage.getItem(EXERCISES)

  const exercisesIds: ExerciseDTO[] = storage ? JSON.parse(storage) : []

  return exercisesIds
}

export async function storageExercisesSave() {
  const { data } = await api.get<ExerciseDTO[]>('exercises')
  const presentExercises = data

  const pastExercises = await storageExercisesGet()

  const newExercises = !arraysHaveSameContent(presentExercises, pastExercises)

  if (newExercises) {
    tagNewExercisesAdded(true)
  }

  await AsyncStorage.setItem(EXERCISES, JSON.stringify(presentExercises))
}
