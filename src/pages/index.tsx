import { useEffect, useState } from 'react'
import useStore from '@/hooks/useStore'
import { signOut } from '@/lib/api/auth'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useQueryUser } from '@/hooks/user/useQueryUser'
import { User } from '@/types/auth'
import { Loader, LoadingOverlay } from '@mantine/core'
import { customLoader } from '@/utils/customLoader'
import SignOutButton from '@/components/auth/SignOutButton'
import { useSignedInStore, useUserStore } from '@/store/auth'
import { useQueryClient } from '@tanstack/react-query'
import Test from '@/components/Test'
import { Layout } from '@/components/layouts/Layout'
import NotAuthorized from '@/components/common/NotAuthorized'
import Main from '@/components/main/Main'

export default function Home() {
  const queryClient = useQueryClient()
  const user = useUserStore((state) => state.user)
  const updateUser = useUserStore((state) => state.updateUser)
  const signedInStore = useStore(useSignedInStore, (state) => state)

  const { data: currentUser, status } = useQueryUser()

  useEffect(() => {
    if (status != 'success') return

    if (currentUser?.isLogin === false) {
      queryClient.removeQueries(['user'])
      updateUser(undefined)
      signedInStore?.setSignedIn(false)
      Cookies.remove('_access_token')
      Cookies.remove('_client')
      Cookies.remove('_uid')
    } else {
      updateUser(currentUser.data)
    }
  }, [status])

  return (
    <Layout>
      {status === 'loading' && (
        <LoadingOverlay
          visible={true}
          overlayBlur={2}
          loader={customLoader}
          overlayOpacity={0.3}
        />
      )}

      {user?.permission === 'guest' ? <NotAuthorized /> : <Main />}
    </Layout>
  )
}
