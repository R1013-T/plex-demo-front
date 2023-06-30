import SignIn from '@/components/auth/SignIn'
import SignUp from '@/components/auth/SignUp'
import { useEffect, useState } from 'react'
import { Anchor, Group, LoadingOverlay, Paper } from '@mantine/core'
import { useLoadingStore } from '@/store/common'
import { customLoader } from '@/utils/customLoader'
import { notifications } from '@mantine/notifications'
import { IconUserCheck } from '@tabler/icons-react'
import useStore from '@/hooks/useStore'
import { useSignedInStore } from '@/store/auth'

const Auth = () => {
  const loading = useLoadingStore((state) => state.loading)

  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <Group position="center" className="h-full w-full">
      <Paper
        className="w-5/6 min-w-[300px] max-w-[700px]"
        shadow="lg"
        p="md"
        withBorder
      >
        <LoadingOverlay
          visible={loading}
          overlayBlur={1}
          // transitionDuration={200}
          loader={customLoader}
          overlayOpacity={0.3}
        />
        {isSignUp ? <SignUp /> : <SignIn />}
        <Group position="center">
          <Anchor
            size="xs"
            mt="xl"
            className="text-brand-secondary"
            onClick={() => setIsSignUp((prevState) => !prevState)}
          >
            {isSignUp ? 'Already have an account ?' : 'Need an account ?'}
          </Anchor>
        </Group>
      </Paper>
    </Group>
  )
}

export default Auth
