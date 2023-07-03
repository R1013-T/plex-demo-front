import React from 'react'
import { Center } from '@mantine/core'

const NotAuthorized = () => {
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
