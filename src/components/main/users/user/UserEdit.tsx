import React from 'react'
import { useEditedUsersStore, useIsUpdatedUserStore } from '@/store/users'
import * as Yup from 'yup'
import { Permission, Role } from '@/types/auth'
import { useForm, yupResolver } from '@mantine/form'
import { Button, Container, Select, TextInput } from '@mantine/core'
import {
  IconAt,
  IconUser,
  IconUserEdit,
  IconUsersGroup,
} from '@tabler/icons-react'
import { useLoadingStore } from '@/store/common'
import { useMutateUser } from '@/hooks/user/useMutateUser'

type Props = {
  close: () => void
}

const UserEdit = (props: Props) => {
  const editedUser = useEditedUsersStore((state) => state.editedUser)
  const setLoading = useLoadingStore((state) => state.setLoading)
  const { updateUserMutation } = useMutateUser()
  const setIsUpdatedUser = useIsUpdatedUserStore(
    (state) => state.setIsUpdatedUser
  )

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required.'),
    email: Yup.string()
      .email('Email Address is invalid.')
      .required('Email Address is required.'),
    role: Yup.mixed<Role | ''>()
      .required('Role is required.')
      .oneOf(Object.values(Role), 'Role is required.'),
    permission: Yup.mixed<Permission | ''>()
      .required('Permission is required.')
      .oneOf(Object.values(Permission), 'Role is required.'),
  })

  const roleOptions = [
    Role.Manager,
    Role.Engineer,
    Role.Designer,
    Role.Sales,
    Role.Other,
  ]

  const permissionOptions = [
    Permission.admin,
    Permission.editor,
    Permission.viewer,
    Permission.guest,
  ]

  const form = useForm({
    validate: yupResolver(schema),
    initialValues: {
      name: editedUser?.name,
      email: editedUser?.email,
      role: editedUser?.role,
      permission: editedUser?.permission,
    },
  })

  const handleEdit = () => {
    const params = {
      id: editedUser?.id as number,
      ...form.values,
    }
    setLoading(true)

    updateUserMutation.mutate(params, {
      onSuccess: () => {
        setIsUpdatedUser(true)
        setLoading(false)
        props.close()
      },
      onError: () => {
        setLoading(false)
        props.close()
      },
    })
  }

  return (
    <Container>
      <form onSubmit={form.onSubmit(handleEdit)}>
        <TextInput
          mt="md"
          id="name"
          label="Name"
          placeholder="Name"
          icon={<IconUser size="0.8rem" />}
          {...form.getInputProps('name')}
          autoComplete="name"
        />
        <TextInput
          mt="md"
          id="email"
          label="Email"
          placeholder="Email Address"
          icon={<IconAt size="0.8rem" />}
          {...form.getInputProps('email')}
          autoComplete="email"
        />
        <Select
          mt="md"
          id="role"
          label="Role"
          placeholder="Role"
          icon={<IconUsersGroup size="0.8rem" />}
          {...form.getInputProps('role')}
          data={roleOptions}
        />
        <Select
          mt="md"
          id="permission"
          label="Permission"
          placeholder="Permission"
          icon={<IconUsersGroup size="0.8rem" />}
          {...form.getInputProps('permission')}
          data={permissionOptions}
        />

        <Button
          type="submit"
          leftIcon={<IconUserEdit size={20} />}
          className="my-10 w-full bg-brand-primary tracking-widest"
        >
          User Edit
        </Button>
      </form>
    </Container>
  )
}

export default UserEdit
