import useStore from '@/hooks/useStore'
import { useSignedInStore } from '@/store/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import client from '@/lib/api/client'
import { Note } from '@/types/note'
import {errorDatabaseNotification, successDatabaseNotification} from '@/utils/notifications/db'

export const useMutateNote = () => {
  const signedInStore = useStore(useSignedInStore, (state) => state)
  const QueryClient = useQueryClient()

  const config = {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  }

  const createNoteMutation = useMutation(
    async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
      const res = await client.post('/notes', note, config)
      return res.data.data
    },
    {
      onSuccess: (res) => {
        console.log(res)
        const previousNotes = QueryClient.getQueryData<any>(['notes'])
        if (previousNotes) {
          QueryClient.setQueriesData<Note[]>(
            ['notes'],
            previousNotes.concat(res)
          )
        }
        successDatabaseNotification(
          'Company Addition Successful ✅',
          'The company data has been successfully added. The changes you made have been saved successfully.'
        )
      },
      onError: (error: any) => {
        if (error.response.status === 401) {
          signedInStore?.setSignedIn(false)
        }
        errorDatabaseNotification(
          'Data Addition Failed ❌',
          'Failed to add the data. Please try again later or contact support for assistance.'
        )
      },
    }
  )

  return { createNoteMutation }
}
