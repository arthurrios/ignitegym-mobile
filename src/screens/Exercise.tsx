import { Box, HStack, Heading, Icon, Image, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from '@components/Button'

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            color="gray.100"
            fontFamily="heading"
            size="lg"
            flexShrink={1}
          >
            Pull-down
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              Back
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <VStack p={8}>
        <Image
          w="full"
          h={80}
          source={{
            uri: 'https://hips.hearstapps.com/hmg-prod/images/form-check-index-1591205064.png?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
          }}
          alt="Exercise name"
          mb={3}
          resizeMode="cover"
          rounded="lg"
          overflow="hidden"
        />

        <Box bg="gray.600" rounded="md" pb={4} px={4}>
          <HStack
            alignItems="center"
            justifyContent="space-around"
            mb={6}
            mt={5}
          >
            <HStack alignItems="center">
              <SeriesSvg />
              <Text color="gray.200" ml="2">
                3 sets
              </Text>
            </HStack>

            <HStack alignItems="center">
              <RepetitionsSvg />
              <Text color="gray.200" ml="2">
                12 reps
              </Text>
            </HStack>
          </HStack>
          <Button title="Mark as done" />
        </Box>
      </VStack>
    </VStack>
  )
}
