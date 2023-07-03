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
    const matchType = 'and' // AND検索の場合は 'and' に変更
    const searchParams = {
      match: matchType,
      queries: {
        id_eq: 1,
        // title_eq: 'title',
        title_cont: 'title',
        id_gteq: '5',
        // 検索条件を追加
      },
    }

    try {
      const res = await client.get('/notes/search', {
        params: { q: searchParams },
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

  const handleCompany = async () => {
    try {
      const res = await client.get('/companies', {
        headers: {
          'access-token': Cookies.get('_access_token'),
          client: Cookies.get('_client'),
          uid: Cookies.get('_uid'),
        },
      })

      console.log('res :', res)
    } catch (e) {
      console.log('e :', e)
    }
  }

  const handleSearchCompanies = async () => {
    const matchType = 'or' // AND検索の場合は 'and' に変更
    const searchParams = {
      match: matchType,
      queries: {
        id_eq: 1,
        id_gteq: '5',
        // 検索条件を追加
      },
    }

    try {
      const res = await client.get('/companies/search', {
        params: { q: searchParams },
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
      <button className="mb-10 block" onClick={handleCompany}>
        company
      </button>
      <button className="mb-10 block" onClick={handleSearchCompanies}>
        get search company
      </button>
    </div>
  )
}

export default Test
