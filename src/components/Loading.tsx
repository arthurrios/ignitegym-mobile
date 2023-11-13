import { Spinner, Center } from 'native-base'

export function Loading() {
  return (
    <Center style={{ flex: 1 }}>
      <Spinner />
    </Center>
  )
}
