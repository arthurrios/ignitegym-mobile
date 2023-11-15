import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Center, ScrollView, Skeleton, VStack } from 'native-base'
import { useState } from 'react'

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(true)

  return (
    <VStack flex={1}>
      <ScreenHeader title="Profile" />
      <ScrollView>
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
        </Center>
      </ScrollView>
    </VStack>
  )
}