import React from 'react'
import client from '@/lib/api/client'
import Cookies from 'js-cookie'

const Test = () => {
  const handleClick = async () => {
    console.log('clicked')

    try {
      const res = await client.get('/notes', {
        headers: {
          'access-token': Cookies.get('_access_token'),
          client: Cookies.get('_client'),
          uid: Cookies.get('_uid'),
        },
      })
      console.log('res :', res)
    } catch (error) {
      console.log('error :', error)
    }
  }

  return (
    <div className="m-10">
      <button onClick={handleClick}>get notes</button>
    </div>
  )
}

export default Test
