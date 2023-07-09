import useStore from '@/hooks/useStore'
import { useSignedInStore } from '@/store/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import client from '@/lib/api/client'
import { Company } from '@/types/company'
import {
  errorDatabaseNotification,
  successDatabaseNotification,
} from '@/utils/notifications/db'
import { User } from '@/types/auth'

export const useMutateUser = () => {
  const signedInStore = useStore(useSignedInStore, (state) => state)
  const QueryClient = useQueryClient()

  const config = {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  }

  const createUserMutation = useMutation(
    async (user: any) => {
      const res = await client.post('/users', user, config)
      return res.data
    },
    {
      onSuccess: (res) => {
        console.log(res)
      },
      onError: (error: any) => {
        if (error.response.status === 401) {
          signedInStore?.setSignedIn(false)
        }
        errorDatabaseNotification(
          'User Data Addition Failed ❌',
          'Failed to add the data. Please try again later or contact support for assistance.'
        )
      },
    }
  )

  const updateUserMutation = useMutation(
    async (user: any) => {
      const res = await client.patch(`/users/${user.id}`, user, config)
      return res.data
    },
    {
      onSuccess: () => {
        successDatabaseNotification(
          'User Data Update Successful ✅',
          'The data has been successfully updated. The changes you made have been saved successfully.'
        )
      },
      onError: (error: any) => {
        if (error.response.status === 401) {
          signedInStore?.setSignedIn(false)
        }
        errorDatabaseNotification(
          'Note Data Update Failed ❌',
          'Failed to update the data. Please try again later or contact support for assistance.'
        )
      },
    }
  )

  return { updateUserMutation, createUserMutation }
}
