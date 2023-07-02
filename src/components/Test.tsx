import React from 'react'
import client from '@/lib/api/client'
import Cookies from 'js-cookie'
import axios from 'axios'
const Test = () => {
  const handleGetNotes = async () => {
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

  const handleCreateNotes = async () => {
    console.log('access-token :', Cookies.get('_access_token'))
    console.log('client :', Cookies.get('_client'))
    console.log('uid :', Cookies.get('_uid'))

    try {
      const res = await axios.post(
        'http://localhost:3001/api/v1/notes',
        {
          title: 'test title 4',
          content: 'test content 4',
          user_id: 4,
          company_id: 4,
        },
        {
          headers: {
            'access-token': Cookies.get('_access_token'),
            client: Cookies.get('_client'),
            uid: Cookies.get('_uid'),
          },
        }
      )
      console.log('res :', res)
    } catch (error) {
      console.log('error :', error)
    }
  }

  const handleSearchNotes = async () => {
    try {
      const res = await client.get('/notes/search', {
        params: {

          title: 'title',

          // and / or
          m: 'and',
          // eq / like
          o: 'eq',
        },
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
      <button className="mb-10 block" onClick={handleGetNotes}>
        get notes
      </button>
      <button className="mb-10 block" onClick={handleCreateNotes}>
        create note
      </button>
      <button className="mb-10 block" onClick={handleSearchNotes}>
        get search notes
      </button>
    </div>
  )
}

export default Test
