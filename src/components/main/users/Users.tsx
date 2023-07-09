import React, { useEffect, useState } from 'react'
import { useUserStore } from '@/store/auth'
import NotAuthorized from '@/components/common/NotAuthorized'
import { useLoadingStore } from '@/store/common'
import { useQueryUsers } from '@/hooks/user/useQueryUsers'
import { LoadingOverlay, Modal } from '@mantine/core'
import Header from '@/components/main/users/Header'
import UserList from '@/components/main/users/UserList'
import UserEdit from '@/components/main/users/user/UserEdit'
import UserCreate from '@/components/main/users/user/UserCreate'
import { useDisclosure } from '@mantine/hooks'
import { useIsUpdatedUserStore } from '@/store/users'
import { useQueryClient } from '@tanstack/react-query'

const Users = () => {
  const { status, error } = useQueryUsers()
  const queryClient = useQueryClient()
  const loading = useLoadingStore((state) => state.loading)
  const user = useUserStore((state) => state.user)
  const isUpdated = useIsUpdatedUserStore((state) => state)

  useEffect(() => {
    queryClient.invalidateQueries(['users'])
    isUpdated.setIsUpdatedUser(false)
  }, [isUpdated.isUpdatedUser])

  const [opened, { open, close }] = useDisclosure(false)
  const [modalTitle, setModalTitle] = useState('')

  if (user?.permission != 'admin') {
    return <NotAuthorized />
  }

  if (status === 'error') {
    return <div>Error occurred: {error?.message || 'An error occurred.'}</div>
  } else {
    return (
      <div>
        {status === 'loading' ||
          (loading && <LoadingOverlay visible={true} color="violet.4" />)}
        {status === 'success' && (
          <>
            <Header open={open} setModalTitle={setModalTitle} />
            <UserList open={open} setModalTitle={setModalTitle} />
            <Modal
              opened={opened}
              onClose={close}
              title={modalTitle}
              size="calc(100vw - 3rem)"
              centered
            >
              {modalTitle === 'User Edit' && <UserEdit close={close} />}
              {modalTitle === 'User Create' && <UserCreate close={close} />}
            </Modal>
          </>
        )}
      </div>
    )
  }
}

export default Users
