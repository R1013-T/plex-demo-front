import React from 'react'
import { useCurrentCompanyStore } from '@/store/Companies'
import { CompanyResponse } from '@/types/company'
import { Button, Card, Grid, Group, Paper, Text } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

const DetailNotes = () => {
  const currentCompany = useCurrentCompanyStore((state) => state.currentCompany)
  const { notes } = currentCompany as CompanyResponse

  const formatIsoDate = (isoDateString: string) => {
    const date = new Date(isoDateString)
    return date.toLocaleDateString('ja-JP')
  }

  const NoteList = () => {
    if (notes.length === 0) {
      return (
        <div className="text-center">
          <Text>No notes</Text>
        </div>
      )
    }

    return (
      <Grid mt="md">
        {notes.map((note) => (
          <Grid.Col xs={12} sm={6} md={4} lg={3} key={note.id}>
            <Paper
              key={note.id}
              shadow="md"
              radius="md"
              p="md"
              withBorder
              className="hover:border-brand-primary"
            >
              <Text fz="base" className="font-semibold">
                {note.title}
              </Text>
              <Text fz="sm" my="sm" lineClamp={5}>
                {note.content}
              </Text>
              <Group>
                <Text fz="xs" className="opacity-60">
                  CreatedAt: {formatIsoDate(note.createdAt)}
                </Text>
                <Text fz="xs" className="opacity-60">
                  UpdatedAt: {formatIsoDate(note.updatedAt)}
                </Text>
              </Group>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    )
  }

  return (
    <Card withBorder mb="xl" >
      <Card.Section>
        <Group position="apart">
          <Text className="p-3 pb-1 text-xl tracking-wider">NOTES</Text>
          <div className="translate-y-2">
            <Button
              leftIcon={
                <IconPlus size="1.3rem" stroke={1.5} className="mr-1" />
              }
              h="2rem"
              className="mr-4 bg-brand-primary px-2 text-sm font-medium"
            >
              New Note
            </Button>
          </div>
        </Group>
      </Card.Section>
      <NoteList />
    </Card>
  )
}

export default DetailNotes
