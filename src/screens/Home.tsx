import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { FlatList, HStack, Heading, Text, VStack } from 'native-base'
import { useState } from 'react'

export function Home() {
  const [groupSelected, setGroupSelected] = useState('back')
  const [groups, setGroups] = useState([
    'back',
    'biceps',
    'triceps',
    'shoulders',
  ])
  const [exercises, setExercises] = useState([
    'Pull-down',
    'One-arm dumbbel row',
    'Pulley row',
    'Deadlift',
  ])

  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleOpenExcerciseDetails() {
    navigation.navigate('exercise')
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontFamily="heading" fontSize="sm">
            Exercises
          </Heading>

          <Text color="gray.200">{exercises.length}</Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExcerciseDetails} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  )
}
