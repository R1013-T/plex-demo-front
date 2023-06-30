import {
  Alert,
  Button,
  Container,
  PasswordInput,
  Select,
  TextInput,
} from '@mantine/core'
import { FiAlertOctagon } from 'react-icons/fi'
import {
  IconAt,
  IconDatabasePlus,
  IconKey,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { useRouter } from 'next/router'
import useStore from '@/hooks/useStore'
import { useSignedInStore, useUserStore } from '@/store/auth'
import { useLoadingStore } from '@/store/common'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useForm, yupResolver } from '@mantine/form'
import { Role, SignUp } from '@/types/auth'
import { signUp } from '@/lib/api/auth'
import Cookies from 'js-cookie'
import {errorNotification, successNotification} from '@/utils/notifications/auth'

const SignUp = () => {
  const router = useRouter()

  const signedStore = useStore(useSignedInStore, (state) => state)
  const user = useStore(useUserStore, (state) => state.user)
  const setLoading = useLoadingStore((state) => state.setLoading)

  const [error, setError] = useState('')

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required.'),
    role: Yup.mixed<Role | ''>()
      .required('Role is required.')
      .oneOf(Object.values(Role), 'Role is required.'),
    email: Yup.string()
      .email('Email Address is invalid.')
      .required('Email Address is required.'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters.')
      .required('Password is required.'),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match.')
      .required('Password confirmation is required.'),
  })

  const roleOptions = [
    Role.Manager,
    Role.Engineer,
    Role.Designer,
    Role.Sales,
    Role.Other,
  ]

  const form = useForm<SignUp>({
    validate: yupResolver(schema),
    initialValues: {
      name: '',
      role: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  })

  const handleSignIn = async () => {
    setError('')
    setLoading(true)

    try {
      const res = await signUp(form.values)

      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])

        signedStore?.setSignedIn(true)

        setTimeout(() => {
          successNotification(
            'Successful account creation 🎉 ',
            'Your account has been successfully created. You will be redirected to the dashboard.'
          )
        }, 1)

      } else {
        setError('An unexpected error has occurred 🚨')
        errorNotification(
          'An unexpected error has occurred 🚨',
          'Please try again later.'
        )
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.errors.fullMessages[0])
        errorNotification(
          `${error.response.data.errors.fullMessages[0]} 🧐`,
          'Please try again.'
        )
      } else {
        setError('An unexpected error has occurred 🚨')
        errorNotification(
          'An unexpected error has occurred 🚨',
          'Please try again later.'
        )
      }
    }

    setLoading(false)
  }

  return (
    <Container>
      <h2 className="text-center text-2xl text-brand-primary">
        Create an account
      </h2>
      {error && (
        <Alert
          my="md"
          variant="filled"
          icon={<FiAlertOctagon size={40} />}
          title="Authorization Error"
          color="red"
          radius="md"
        >
          {error}
        </Alert>
      )}
      <form onSubmit={form.onSubmit(handleSignIn)}>
        <TextInput
          mt="md"
          id="name"
          label="Name"
          placeholder="Name"
          icon={<IconUser size="0.8rem" />}
          {...form.getInputProps('name')}
          autoComplete="name"
        />
        <Select
          mt="md"
          id="role"
          label="Role"
          placeholder="Role"
          icon={<IconUsersGroup size="0.8rem" />}
          {...form.getInputProps('role')}
          autoComplete="role"
          data={roleOptions}
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
        <PasswordInput
          mt="md"
          id="password"
          label="Password"
          placeholder="Password"
          icon={<IconKey size="0.8rem" />}
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <VscEye size={20} /> : <VscEyeClosed size={20} />
          }
          {...form.getInputProps('password')}
          autoComplete="false"
        />
        <PasswordInput
          mt="md"
          id="password_confirmation"
          label="Password Confirmation"
          placeholder="Password Confirmation"
          icon={<IconKey size="0.8rem" />}
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <VscEye size={20} /> : <VscEyeClosed size={20} />
          }
          {...form.getInputProps('password_confirmation')}
          autoComplete="false"
        />
        <Button
          type="submit"
          leftIcon={<IconDatabasePlus size={20} />}
          className="mt-10 w-full bg-brand-primary"
        >
          Register
        </Button>
      </form>
    </Container>
  )
}

export default SignUp
