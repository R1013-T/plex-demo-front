import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { useUserStore } from '@/store/auth'
import { ngUserNotification } from '@/utils/notifications/permission'
import { useForm, yupResolver } from '@mantine/form'
import { Company } from '@/types/company'
import { Button, Checkbox, ScrollArea, TextInput } from '@mantine/core'
import { useMutateCompany } from '@/hooks/company/useMutateCompany'
import { useIsUpdatedCompanyStore } from '@/store/Companies'
import {useLoadingStore} from "@/store/common";

type Props = {
  close: () => void
}

const validationSchema = Yup.object().shape({
  code: Yup.number().required('Code is required.'),
  name: Yup.string().required('Name is required.'),
  nameKana: Yup.string().required('NameKana is required.'),
  listingStatus: Yup.boolean(),
  postalCode: Yup.string().required('postalCode is required.'),
  address: Yup.string().required('address is required.'),
  phone: Yup.string().required('phone is required.'),
  representativeName: Yup.string().required('representativeName is required.'),
  representativeNameKana: Yup.string().required('representativeNameKana is required.'),
  revenue_2020: Yup.number().required('revenue_2020 is required.'),
  revenue_2021: Yup.number().required('revenue_2021 is required.'),
  revenue_2022: Yup.number().required('revenue_2022 is required.'),
  profit_2020: Yup.number().required('profit_2020 is required.'),
  profit_2021: Yup.number().required('profit_2021 is required.'),
  profit_2022: Yup.number().required('profit_2022 is required.'),
})

const fields = [
  { id: 'code', label: 'Code', type: 'text' },
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'nameKana', label: 'NameKana', type: 'text' },
  { id: 'listingStatus', label: 'ListingStatus', type: 'checkbox' },
  { id: 'postalCode', label: 'PostalCode', type: 'text' },
  { id: 'address', label: 'Address', type: 'text' },
  { id: 'phone', label: 'Phone', type: 'text' },
  { id: 'representativeName', label: 'representativeName', type: 'text' },
  {
    id: 'representativeNameKana',
    label: 'representativeNameKana',
    type: 'text',
  },
  { id: 'revenue_2020', label: 'revenue 2020', type: 'text' },
  { id: 'revenue_2021', label: 'revenue 2021', type: 'text' },
  { id: 'revenue_2022', label: 'revenue 2022', type: 'text' },
  { id: 'profit_2020', label: 'profit 2020', type: 'text' },
  { id: 'profit_2021', label: 'profit 2021', type: 'text' },
  { id: 'profit_2022', label: 'profit 2022', type: 'text' },
]
const InsertRow = (props: Props) => {
  const user = useUserStore((state) => state.user)
  const { createCompanyMutation } = useMutateCompany()
  const setIsUpdatedCompany = useIsUpdatedCompanyStore(
    (state) => state.setIsUpdatedCompany
  )
  const setLoading = useLoadingStore((state) => state.setLoading)

  useEffect(() => {
    if (user?.permission === 'admin' || user?.permission === 'editor') {
    } else {
      props.close()
      ngUserNotification(
        'Permission Denied ❌',
        'You do not have permission to access this page.'
      )
    }
  }, [])

  const form = useForm<Company>({
    validate: yupResolver(validationSchema),
    initialValues: {} as Company,
  })

  const handleSubmit = async () => {
    setLoading(true)
    createCompanyMutation.mutate(form.values, {
      onSuccess: () => {
        setLoading(false)
        setIsUpdatedCompany(true)
        props.close()
      },
    })
  }

  return (
    <ScrollArea h={500}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {fields.map((field) => {
          if (field.type === 'text') {
            return (
              <TextInput
                key={field.id}
                id={field.id}
                label={field.label}
                mt="md"
                type="text"
                {...form.getInputProps(field.id)}
              />
            )
          }

          if (field.type === 'checkbox') {
            return (
              <Checkbox
                key={field.id}
                id={field.id}
                label={field.label}
                mt="md"
                {...form.getInputProps(field.id, { type: 'checkbox' })}
              />
            )
          }

          return null
        })}
        <Button
          mt="xl"
          type="submit"
          className="w-full bg-brand-primary tracking-widest"
        >
          Create New Company
        </Button>
      </form>
    </ScrollArea>
  )
}

export default InsertRow
