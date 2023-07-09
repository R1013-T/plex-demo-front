import React, { useEffect } from 'react'
import { Center, Text } from '@mantine/core'
import { ngUserNotification } from '@/utils/notifications/permission'

const NotAuthorized = () => {

  return (
    <section className="h-screen-main w-full">
      <Center className='h-full' >
        <Text>
          You do not have authorization. Please check with your administrator ❌
        </Text>
      </Center>
    </section>
  )
}

export default NotAuthorized
