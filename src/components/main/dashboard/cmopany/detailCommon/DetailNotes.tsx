import React, {useEffect, useState} from 'react'
import { useCurrentCompanyStore } from '@/store/Companies'
import { CompanyResponse } from '@/types/company'
import {
  Button,
  Card,
  Container,
  Grid,
  Group,
  Modal,
  Paper, Stack,
  Text,
} from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import DisplayColumns from '@/components/main/dashboard/modal/DisplayColumns'
import Filter from '@/components/main/dashboard/modal/Filter'
import InsertRow from '@/components/main/dashboard/modal/InsertRow'
import AddNote from '@/components/main/notes/AddNote'
import EditNote from "@/components/main/notes/EditNote";
import {Note} from "@/types/note";

const DetailNotes = () => {
  const currentCompany = useCurrentCompanyStore((state) => state.currentCompany)
  const { notes } = currentCompany as CompanyResponse
  const [opened, { open, close }] = useDisclosure(false)
  const [modalState, setModalState] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [editNote, setEditNote] = useState<Note>()

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
              onClick={() => {
                setEditNote(note)
                setModalState('edit')
                setModalTitle('Edit Note')
                open()
              }}
            >
              <Text fz="base" className="font-semibold">
                {note.title}
              </Text>
              <div dangerouslySetInnerHTML={{ __html: note.content }} />
              <Group spacing={2} >
                <Text fz="xs" className="opacity-60 pr-5">
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
    <Card withBorder mb="xl">
      <Modal
        opened={opened}
        onClose={close}
        title={modalTitle}
        size="calc(100vw - 3rem)"
        centered
      >
        {modalState === 'new' && <AddNote close={close} />}
        {modalState === 'edit' && <EditNote note={editNote} close={close} />}
      </Modal>
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
              onClick={() => {
                setModalState('new')
                setModalTitle('New Note')
                open()
              }}
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
