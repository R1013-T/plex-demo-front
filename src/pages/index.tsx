import { useEffect } from 'react'
import useStore from '@/hooks/useStore'
import { signOut } from '@/lib/api/auth'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useQueryUser } from '@/hooks/user/useQueryUser'
import { User } from '@/types/auth'
import {Loader, LoadingOverlay} from '@mantine/core'
import { customLoader } from '@/utils/customLoader'
import SignOutButton from "@/components/auth/SignOutButton";
import {useSignedInStore, useUserStore} from "@/store/auth";
import {useQueryClient} from "@tanstack/react-query";
import Test from "@/components/Test";

export default function Home() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const updateUser = useUserStore((state) => state.updateUser)
  const signedInStore = useStore(useSignedInStore, (state) => state)

  const { data:currentUser, status } = useQueryUser()


  useEffect(() => {
    if (status != 'success') return

    if (currentUser?.isLogin === false) {

      console.log('user', currentUser)
      console.log('status', status)

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
    <main>
      {status === 'loading' && (
        <LoadingOverlay
          visible={true}
          overlayBlur={2}
          loader={customLoader}
          overlayOpacity={0.3}
        />
      )}

      {currentUser?.data?.name}
      <br />
      <SignOutButton />
      <Test />
    </main>
  )
}
