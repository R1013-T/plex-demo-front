import { Company, CompanyResponse } from '@/types/company'
import React, { useEffect } from 'react'
import {
  Button,
  Checkbox,
  Container,
  ScrollArea,
  TextInput,
} from '@mantine/core'
import {
  useCurrentCompanyStore,
  useIsUpdatedCompanyStore,
} from '@/store/Companies'
import { useForm, yupResolver } from '@mantine/form'
import * as Yup from 'yup'
import { useUserStore } from '@/store/auth'
import { ngUserNotification } from '@/utils/notifications/permission'
import { useMutateCompany } from '@/hooks/company/useMutateCompany'
import {useLoadingStore} from "@/store/common";

type Props = {
  setIsEdit: (isEdit: boolean) => void
  setDetailId: (id: number) => void
}

const validationSchema = Yup.object().shape({
  code: Yup.number().required('Code is required.'),
  name: Yup.string().required('Name is required.'),
  nameKana: Yup.string().required('NameKana is required.'),
  listingStatus: Yup.boolean().required('listingStatus is required.'),
  postalCode: Yup.string().required('postalCode is required.'),
  address: Yup.string().required('address is required.'),
  phone: Yup.string().required('phone is required.'),
  representativeName: Yup.string().required('representativeName is required.'),
  representativeNameKana: Yup.string().required(
    'representativeNameKana is required.'
  ),
  revenue_2020: Yup.number().required('revenue_2020 is required.'),
  revenue_2021: Yup.number().required('revenue_2021 is required.'),
  revenue_2022: Yup.number().required('revenue_2022 is required.'),
  profit_2020: Yup.number().required('profit_2020 is required.'),
  profit_2021: Yup.number().required('profit_2021 is required.'),
  profit_2022: Yup.number().required('profit_2022 is required.'),
})

const CompanyEdit = (props: Props) => {
  const currentCompany = useCurrentCompanyStore((state) => state.currentCompany)
  const { company } = currentCompany as CompanyResponse
  const user = useUserStore((state) => state.user)
  const { updateCompanyMutation } = useMutateCompany()
  const setIsUpdatedCompany = useIsUpdatedCompanyStore(
    (state) => state.setIsUpdatedCompany
  )
  const setLoading = useLoadingStore((state) => state.setLoading)

  useEffect(() => {
    if (user?.permission === 'admin' || user?.permission === 'editor') {
    } else {
      props.setIsEdit(false)
      ngUserNotification(
        'Permission Denied ❌',
        'You do not have permission to access this page.'
      )
    }
  }, [])

  const form = useForm<Company>({
    validate: yupResolver(validationSchema),
    initialValues: company,
  })

  const handleSubmit = async () => {
    setLoading(true)
    updateCompanyMutation.mutate(form.values, {
      onSuccess: () => {
        setLoading(false)
        setIsUpdatedCompany(true)
        props.setDetailId(0)
      },
    })
  }

  const renderFormInput = (key: string) => {
    if (key === 'listingStatus') {
      return (
        <Checkbox
          labelPosition="left"
          key={key}
          mt="md"
          id={key}
          label={key}
          {...form.getInputProps(key, { type: 'checkbox' })}
        />
      )
    }

    return (
      <TextInput
        key={key}
        mt="md"
        id={key}
        label={key}
        {...form.getInputProps(key)}
      />
    )
  }

  return (
    <ScrollArea className="h-screen-main-inner">
      <Container>
        <form
          className="relative h-screen-main-inner tracking-wider"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          {Object.keys(company)
            .filter((key) => !['id', 'createdAt', 'updatedAt'].includes(key)) // Filter out the keys that you do not want to render
            .map((key) => renderFormInput(key))}
          <Button
            type="submit"
            className="fixed bottom-10 right-4 w-screen-main-inner bg-brand-primary tracking-widest"
          >
            Save and Close
          </Button>
          <div className="h-28"></div>
        </form>
      </Container>
    </ScrollArea>
  )
}

export default CompanyEdit
