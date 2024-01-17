import { OneSignal } from 'react-native-onesignal'
import { Platform } from 'react-native'

function oneSignalInitialize() {
  const oneSignalAppId =
    Platform.OS === 'ios'
      ? 'EXPO_PUBLIC_ONE_SIGNAL_APP_ID_IOS'
      : '3e5fea57-f4a2-4ffd-97ca-a74c02d3e0a0'

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
