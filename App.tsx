/* eslint-disable camelcase */
import { StatusBar } from 'react-native'
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
import { oneSignalInitialize } from 'src/libs/oneSignal'

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold })

  useEffect(() => {
    oneSignalInitialize()
  }, [])

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
