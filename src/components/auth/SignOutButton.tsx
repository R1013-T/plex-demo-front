import React from 'react'
import { Button } from '@mantine/core'
import { signOut } from '@/lib/api/auth'
import { useRouter } from 'next/router'
import { useSignedInStore, useUserStore } from '@/store/auth'
import { useQueryClient } from '@tanstack/react-query'
import { successNotification } from '@/utils/notifications/auth'
import useStore from '@/hooks/useStore'
import Cookies from 'js-cookie'

const SignOutButton = () => {
  const queryClient = useQueryClient()
  const updateUser = useUserStore((state) => state.updateUser)
  const signedInStore = useStore(useSignedInStore, (state) => state)

  const handleLogout = async () => {
    try {
      const res = await signOut()

      if (res.data.success) {
        successNotification(
          'Sign Out Success 👋',
          `You have successfully signed out. See you again soon!`
        )
      } else {
        console.log('error: ', res.data.errors)
      }
    } catch (error) {
      console.log('error: ', error)
    }

    queryClient.removeQueries(['user'])
    updateUser(undefined)
    signedInStore?.setSignedIn(false)
    Cookies.remove('_access_token')
    Cookies.remove('_client')
    Cookies.remove('_uid')
  }

  return <Button onClick={handleLogout}>Sign Out</Button>
}

export default SignOutButton;
