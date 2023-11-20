import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { Box, useTheme } from 'native-base'
import { AppRoutes } from './app.routes'
import { useAuth } from '@hooks/useAuth'

export function Routes() {
  const { colors } = useTheme()
  const { user } = useAuth()

  console.log('USUÁRIO LOGADO =>', user)

  const theme = DefaultTheme
  theme.colors.background = colors.gray[700]
  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  )
}
