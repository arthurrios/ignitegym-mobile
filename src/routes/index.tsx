import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { Box, useTheme } from 'native-base'
import { AppRoutes } from './app.routes'
import { useContext } from 'react'
import { AuthContext } from '@contexts/AuthContext'

export function Routes() {
  const { colors } = useTheme()

  const contextData = useContext(AuthContext)
  console.log('USUÁRIO LOGADO =>', contextData)

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
