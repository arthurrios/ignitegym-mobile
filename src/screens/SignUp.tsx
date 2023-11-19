import { Center, Heading, Image, Text, VStack, ScrollView } from 'native-base'
import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'

type FormDataProps = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export function SignUp() {
  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSignUp({
    name,
    email,
    password,
    passwordConfirm,
  }: FormDataProps) {
    console.log({
      name,
      email,
      password,
      passwordConfirm,
    })
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="People training"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Train your mind and body
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Create your account
          </Heading>

          <Controller
            control={control}
            name="name"
            rules={{
              required: 'Enter a name',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Name"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Enter an e-mail',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid e-mail',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirm password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
              />
            )}
          />

          <Button
            title="Create and Log in"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button
          title="Back to Log in"
          variant="outline"
          mt={24}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  )
}
