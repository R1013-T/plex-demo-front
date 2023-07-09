import { useQuery, useQueryClient } from '@tanstack/react-query'
import useStore from '@/hooks/useStore'
import { useSignedInStore, useUserStore } from '@/store/auth'
import { useUsersStore } from '@/store/users'
import client from '@/lib/api/client'
import Cookies from 'js-cookie'
import { errorDatabaseNotification } from '@/utils/notifications/db'

export const useQueryUsers = () => {
  const queryClient = useQueryClient()
  const updateUser = useUserStore((state) => state.updateUser)
  const signedInStore = useStore(useSignedInStore, (state) => state)
  const setUsers = useUsersStore((state) => state.setUsers)

  const getUsers = async () => {
    const { data, headers } = await client.get('/users', {
      headers: {
        'access-token': Cookies.get('_access_token'),
        client: Cookies.get('_client'),
        uid: Cookies.get('_uid'),
      },
    })

    return data
  }

  return useQuery<any, Error>({
    queryKey: ['users'],
    queryFn: getUsers,
    onSuccess: (data) => {
      setUsers(data.data)
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        updateUser(undefined)
        signedInStore?.setSignedIn(false)
        queryClient.removeQueries(['user'])
        Cookies.remove('_access_token')
        Cookies.remove('_client')
        Cookies.remove('_uid')
        errorDatabaseNotification(
          'Please Log In Again 🫠',
          'To proceed, please log in. Please use your credentials to log in and access your account.'
        )
      } else {
        errorDatabaseNotification(
          'Failed to Retrieve Users Information ❌',
          'We apologize, but we were unable to retrieve the users information. There may be a problem with the connection to the server. Please try again later.'
        )
      }
    },
  })
}
