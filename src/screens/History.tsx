import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { Heading, VStack, SectionList, Text } from 'native-base'
import { useState } from 'react'

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '08.26.23',
      data: ['Pull-down', 'One-arm dumbbel row'],
    },
    {
      title: '08.27.23',
      data: ['Pull-down'],
    },
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Exercise history" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            There are no exercises registered yet. {'\n'}
            Let's exercise?
          </Text>
        )}
      />
    </VStack>
  )
}
