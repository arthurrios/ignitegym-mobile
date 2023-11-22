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
  useToast,
} from 'native-base'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useAuth } from '@hooks/useAuth'

const PHOTO_SIZE = 33

type FormDataProps = {
  name: string
  email: string
  password: string
  oldPassword: string
  confirmPassword: string
}

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState(
    'https://github.com/arthurrios.png',
  )

  const toast = useToast()
  const { user } = useAuth()
  const { control } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  })

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) return

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri,
        )

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: 'This image is too large. Choose an image up to 5MB.',
            placement: 'top',
            bgColor: 'red.500',
          })
        }

        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

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
          <TouchableOpacity onPress={handleUserPhotoSelect}>
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

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Name"
                bg="gray.600"
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Email"
                bg="gray.600"
                isDisabled
                onChangeText={onChange}
                value={value}
              />
            )}
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
