import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { Box, useTheme } from 'native-base'
import { AppRoutes } from './app.routes'
import { useAuth } from '@hooks/useAuth'
import { Loading } from '@components/Loading'
import { useEffect, useState } from 'react'
import { tagIsLoggedIn } from '@notifications/notificationTags'
import { OSNotification, OneSignal } from 'react-native-onesignal'
import { NotificationEventTypeMap } from 'react-native-onesignal/dist/models/NotificationEvents'
import { Notification } from '@components/Notification'

export function Routes() {
  const { colors } = useTheme()
  const { user, isLoadingUserStorageData } = useAuth()
  const [notification, setNotification] = useState<OSNotification>()

  const theme = DefaultTheme
  theme.colors.background = colors.gray[700]

  useEffect(() => {
    tagIsLoggedIn(user.id ? 'true' : 'false')
  }, [user])

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener(
      'foregroundWillDisplay',
      (
        notificationReceivedEvent: NotificationEventTypeMap['foregroundWillDisplay'],
      ) => {
        const response = notificationReceivedEvent.getNotification()

        setNotification(response)
      },
    )

    return () => unsubscribe
  }, [])

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
        {notification?.title && (
          <Notification
            data={notification}
            onClose={() => setNotification(undefined)}
          />
        )}
      </NavigationContainer>
    </Box>
  )
}
