import * as Yup from 'yup'
import { useForm, yupResolver } from '@mantine/form'
import { SignIn } from '@/types/auth'
import {
  Alert,
  Button,
  Container,
  PasswordInput,
  TextInput,
} from '@mantine/core'
import { IconAt, IconKey, IconLogin } from '@tabler/icons-react'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { FiAlertOctagon } from 'react-icons/fi'
import { useState } from 'react'
import { signIn } from '@/lib/api/auth'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import useStore from '@/hooks/useStore'
import { useSignedInStore, useUserStore } from '@/store/auth'
import { useLoadingStore } from '@/store/common'

const SignIn = () => {
  const router = useRouter()

  const signedStore = useStore(useSignedInStore, (state) => state)
  const updateUser = useUserStore((state) => state.updateUser)
  const setLoading = useLoadingStore((state) => state.setLoading)

  const [error, setError] = useState('')

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Email Address is invalid.')
      .required('Email Address is required.'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters.')
      .required('Password is required.'),
  })

  const form = useForm<SignIn>({
    validate: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  })

  const handleSignIn = async () => {
    setError('')
    setLoading(true)

    try {
      const res = await signIn(form.values)

      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])

        signedStore?.setSignedIn(true)
        updateUser(res.data.data)

        router.push('/')
      } else {
        setError('An unexpected error has occurred.')
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.errors[0])
      } else {
        setError('An unexpected error has occurred.')
      }
    }

    setLoading(false)
  }

  return (
    <Container>
      <h2 className="text-center text-2xl text-brand-primary">
        Welcome back !
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
        <Button
          type="submit"
          leftIcon={<IconLogin size={20} />}
          className="mt-10 w-full bg-brand-primary"
        >
          Login
        </Button>
      </form>
    </Container>
  )
}

export default SignIn
