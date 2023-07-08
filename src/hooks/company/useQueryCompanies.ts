import client from '@/lib/api/client'
import Cookies from 'js-cookie'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useStore from '@/hooks/useStore'
import { useSignedInStore, useUserStore } from '@/store/auth'
import { CompaniesResponse, Company } from '@/types/company'
import { useCompaniesStore } from '@/store/Companies'
import { errorDatabaseNotification } from '@/utils/notifications/db'

export const useQueryCompanies = () => {
  const queryClient = useQueryClient()
  const updateUser = useUserStore((state) => state.updateUser)
  const signedInStore = useStore(useSignedInStore, (state) => state)
  const setCompanies = useCompaniesStore((state) => state.setCompanies)

  const getCompanies = async () => {
    const { data, headers } = await client.get('/companies', {
      headers: {
        'access-token': Cookies.get('_access_token'),
        client: Cookies.get('_client'),
        uid: Cookies.get('_uid'),
      },
    })

    return data
  }

  return useQuery<CompaniesResponse, Error>({
    queryKey: ['companies'],
    queryFn: getCompanies,
    onSuccess: (data) => {
      setCompanies(data.data)
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
          'Failed to Retrieve Company Information ❌',
          'We apologize, but we were unable to retrieve the company information. There may be a problem with the connection to the server. Please try again later.'
        )
      }
    },
  })
}
