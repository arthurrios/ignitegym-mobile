import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from 'native-base'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  return (
    <VStack flex={1}>
      <ScreenHeader title="Profile" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              source={{ uri: 'https://github.com/arthurrios.png' }}
              alt="User Photo"
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity>
            <Text
              color="green.500"
              fontFamily="heading"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Change photo
            </Text>
          </TouchableOpacity>

          <Input placeholder="Name" bg="gray.600" />
          <Input
            placeholder="E-mail"
            bg="gray.600"
            value="arthur.rios007@gmail.com"
            isDisabled
          />

          <Heading
            fontFamily="heading"
            color="gray.200"
            fontSize="md"
            alignSelf="flex-start"
            mb={2}
            mt={12}
          >
            Change password
          </Heading>

          <Input placeholder="Old password" bg="gray.600" secureTextEntry />
          <Input placeholder="New password" bg="gray.600" secureTextEntry />
          <Input
            placeholder="Confirm new password"
            bg="gray.600"
            secureTextEntry
          />

          <Button title="Update" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  )
}
