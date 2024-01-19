/* eslint-disable camelcase */
import { AppState, NativeEventSubscription, StatusBar } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { NativeBaseProvider } from 'native-base'
import { THEME } from './src/theme'
import { Loading } from '@components/Loading'
import { Routes } from '@routes/index'
import { AuthContextProvider } from '@contexts/AuthContext'
import { useEffect } from 'react'
import { oneSignalInitialize } from '@libs/oneSignal'
import { daysSinceLastExercise } from '@utils/daysSinceLastExercise'
import { storageExercisesSave } from '@storage/storageExercises'
import { tagNewExercisesAdded } from '@notifications/notificationTags'
import { useAppState } from '@react-native-community/hooks'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })
  const appState = useAppState()

  useEffect(() => {
    oneSignalInitialize()
    daysSinceLastExercise()
    storageExercisesSave()
  }, [])

  useEffect(() => {
    if (appState === 'active') {
      tagNewExercisesAdded(false)
    }
  }, [appState])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  )
}
