import React, {useEffect} from 'react'
import { Center } from '@mantine/core'
import {ngUserNotification} from "@/utils/notifications/permission";

const NotAuthorized = () => {

  useEffect(() => {
    ngUserNotification(
      'Permission Denied ❌',
      'You do not have permission to access this page.'
    )
  },[])

  return (
    <section className="h-screen-main w-full">
      <Center>
        <h2>Not Authorized</h2>
        <p>
          You do not have authorization. Please check with your administrator.
        </p>
      </Center>
    </section>
  )
}

export default NotAuthorized
