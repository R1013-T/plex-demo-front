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

type Props = {
  close: () => void
}
const AddNote = (props: Props) => {
  const user = useUserStore((state) => state.user)
  const currentCompany = useCurrentCompanyStore((state) => state.currentCompany)
  const setLoading = useLoadingStore((state) => state.setLoading)
  const { createNoteMutation } = useMutateNote()
  const setIsUpdatedNote = useIsUpdatedNoteStore(
    (state) => state.setIsUpdatedNote
  )

  const schema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
  })

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      title: '',
    },
  })

  const handleAddNote = () => {
    setLoading(true)

    const param = {
      title: form.values.title,
      content: editor?.getHTML() || '',
      companyId: currentCompany?.company.id || 0,
      userId: user?.id || 0,
    }

    createNoteMutation.mutate(param, {
      onSuccess: () => {
        setLoading(false)
        setIsUpdatedNote(true)
        props.close()
      },
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
    content: '',
  })

  useEffect(() => {
    if (user?.permission === 'guest' || user?.permission === 'viewer') {
      props.close()
      ngUserNotification(
        'Permission Denied ❌',
        'You do not have permission to access this page.'
      )
    }
  }, [user])

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
          leftIcon={<IconPlus size={20} />}
          className="racking-widest my-5 w-full bg-brand-primary"
        >
          Add New Note
        </Button>
      </form>
    </Container>
  )
}

export default AddNote
