import React, { useEffect } from 'react'
import { useUserStore } from '@/store/auth'
import { ngUserNotification } from '@/utils/notifications/permission'
import { useLoadingStore } from '@/store/common'
import * as Yup from 'yup'
import { useForm, yupResolver } from '@mantine/form'
import { useCurrentCompanyStore } from '@/store/Companies'
import { Button, Container, TextInput } from '@mantine/core'
import AddNoteContent from '@/components/main/notes/NoteContent'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Link } from '@mantine/tiptap'
import Superscript from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { IconNotes, IconPlus } from '@tabler/icons-react'
import { useMutateNote } from '@/hooks/note/useMutateNote'
import { useIsUpdatedNoteStore } from '@/store/notes'
import { Note } from '@/types/note'

type Props = {
  note?: Note
  close: () => void
}
const EditNote = (props: Props) => {
  const user = useUserStore((state) => state.user)
  const currentCompany = useCurrentCompanyStore((state) => state.currentCompany)
  const setLoading = useLoadingStore((state) => state.setLoading)
  const { updateNoteMutation } = useMutateNote()
  const setIsUpdatedNote = useIsUpdatedNoteStore(
    (state) => state.setIsUpdatedNote
  )

  const schema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
  })

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      title: props.note?.title,
    },
  })

  const handleAddNote = () => {
    if (user?.permission === 'guest' || user?.permission === 'viewer') {
      ngUserNotification(
        'Permission Denied ❌',
        'You do not have permission to access this page.'
      )
      return
    }

    setLoading(true)

    const param = {
      id: props.note?.id || 0,
      title: form.values.title || '',
      content: editor?.getHTML() || '',
    }

    updateNoteMutation.mutate(param, {
      onSuccess: () => {
        setLoading(false)
        setIsUpdatedNote(true)
        props.close()
      },
      onError: () => {
        setLoading(false)
      }
    })
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: props.note?.content,
  })

  return (
    <Container>
      <form onSubmit={form.onSubmit(handleAddNote)}>
        <TextInput
          my="md"
          id="title"
          label="Note Title"
          placeholder="Note Title"
          icon={<IconNotes size="1rem" />}
          {...form.getInputProps('title')}
        />
        <AddNoteContent editor={editor} />
        <Button
          type="submit"
          className="my-5 w-full bg-brand-primary tracking-widest"
          disabled={
            user?.permission === 'guest' || user?.permission === 'viewer'
          }
        >
          Save
        </Button>
      </form>
    </Container>
  )
}

export default EditNote
