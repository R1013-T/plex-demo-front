import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Company } from '@/types/company'
import client from '@/lib/api/client'
import useStore from '@/hooks/useStore'
import { useSignedInStore } from '@/store/auth'
import Cookies from 'js-cookie'
import {
  errorDatabaseNotification,
  successDatabaseNotification,
} from '@/utils/notifications/db'

export const useMutateCompany = () => {
  const signedInStore = useStore(useSignedInStore, (state) => state)
  const QueryClient = useQueryClient()

  const config = {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  }

  const createCompanyMutation = useMutation(
    async (company: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) => {
      const res = await client.post('/companies', company, config)
      return res.data
    },
    {
      onSuccess: (res) => {
        const previousCompanies = QueryClient.getQueryData<any>(['companies'])
        if (previousCompanies.data) {
          QueryClient.setQueriesData<Company[]>(
            ['companies'],
            previousCompanies.data.concat(res)
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
          'Company Addition Failed ❌',
          'Failed to add the data. Please try again later or contact support for assistance.'
        )
      },
    }
  )

  const updateCompanyMutation = useMutation(
    async (company: Company) => {
      const res = await client.put(`/companies/${company.id}`, company, config)
      return res.data
    },
    {
      onSuccess: (res, variables) => {
        const previousCompanies = QueryClient.getQueryData<any>(['companies'])
        if (previousCompanies.data) {
          QueryClient.setQueriesData<Company[]>(
            ['companies'],
            previousCompanies.data.map((company: Company) =>
              company.id === variables.id ? res : company
            )
          )
        }
        successDatabaseNotification(
          'Data Update Successful ✅',
          'he data has been successfully updated. The changes you made have been saved successfully.'
        )
      },
      onError: (error: any) => {
        if (error.response.status === 401) {
          signedInStore?.setSignedIn(false)
        }
        errorDatabaseNotification(
          'Data Update Failed ❌',
          'We apologize, but the data update has failed. Unfortunately, we encountered an issue while trying to save the changes.'
        )
      },
    }
  )

  return { createCompanyMutation, updateCompanyMutation }
}
