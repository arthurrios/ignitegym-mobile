import { OneSignal } from 'react-native-onesignal'
import { Platform } from 'react-native'
import { env } from './../env'

function oneSignalInitialize() {
  const oneSignalAppId =
    Platform.OS === 'ios'
      ? env.EXPO_PUBLIC_ONE_SIGNAL_APP_ID_IOS
      : env.EXPO_PUBLIC_ONE_SIGNAL_APP_ID_ANDROID

  if (oneSignalAppId) {
    OneSignal.initialize(oneSignalAppId)
  }

  if (Platform.OS === 'ios') {
    OneSignal.Notifications.canRequestPermission().then((response) => {
      if (response) {
        OneSignal.Notifications.requestPermission(true)
      }
    })
  }
}

export { oneSignalInitialize }
