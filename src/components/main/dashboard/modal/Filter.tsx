import React, { useEffect, useState } from 'react'
import {
  Anchor,
  Button,
  Center,
  Group,
  Menu,
  Radio,
  ScrollArea,
  Select,
  Text,
} from '@mantine/core'
import { SearchCompaniesParams, SearchParams } from '@/types/company'
import { IconPlus } from '@tabler/icons-react'
import FilterItem from '@/components/main/dashboard/modal/FilterItem'
import { useSearchQueryCompanies } from '@/hooks/company/useSearchQuery'
import client from '@/lib/api/client'
import Cookies from 'js-cookie'
import { useCompaniesStore, useSearchCompaniesStore } from '@/store/Companies'
import { useQueryClient } from '@tanstack/react-query'

type Props = {
  close: () => void
}

const Filter = (props:Props) => {
  const [searchInputs, setSearchInputs] = useState<number>(0)
  const [marchType, setMarchType] = useState<string>('and')
  const setCompanies = useCompaniesStore((state) => state.setCompanies)
  const setSearchCompaniesParams = useSearchCompaniesStore(
    (state) => state.setSearchCompaniesParams
  )
  const queryClient = useQueryClient()

  const getSearchCompanies = async (searchParams: SearchParams) => {
    console.log('searchParams :', searchParams)

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
      setCompanies(res.data)
    } catch (error) {
      console.log('error :', error)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const searchQuery = {
      params: [] as string[],
      values: [] as string[],
    }

    // 動的に追加されたinputの値を取得する
    // Hooksでのやり方がわからない
    const formEl: any = document.forms
    const inputs = {
      params: formEl.filterForm.searchParam,
      selectors: formEl.filterForm.searchSelector,
      values: formEl.filterForm.searchValue,
    }

    // paramsとvaluesをそれぞれ配列に格納する
    if (!inputs.params) {
      queryClient.removeQueries(['companies'])
      setSearchCompaniesParams({ match: "and", queries: {} })
      queryClient.invalidateQueries(['companies'])
      props.close()
      return
    }

    if (inputs.params.length) {
      for (let i = 0; i < inputs.params.length; i++) {
        searchQuery.params.push(
          inputs.params[i].value + '_' + inputs.selectors[i].value
        )
        searchQuery.values.push(inputs.values[i].value)
      }
    } else {
      searchQuery.params.push(
        inputs.params.value + '_' + inputs.selectors.value
      )
      searchQuery.values.push(inputs.values.value)
    }

    // params:values の形式に変換する
    let query = searchQuery.params.reduce<Record<string, string>>(
      (acc, param, index) => {
        acc[param] = searchQuery.values[index]
        return acc
      },
      {}
    )

    queryClient.removeQueries(['companies'])
    setSearchCompaniesParams({ match: marchType, queries: query })
    queryClient.invalidateQueries(['companies'])
  }

  return (
    <div className="relative h-modal">
      <form name="filterForm" onSubmit={handleSubmit} className="m-auto w-3/4">
        <ScrollArea className="h-modal-inner pb-20">
          {Array.from(Array(searchInputs).keys()).map((i) => (
            <div key={i} className="w-full overflow-hidden">
              <FilterItem />
            </div>
          ))}
        </ScrollArea>
        <div className="absolute bottom-0 left-10 right-10">
          <Anchor
            component="button"
            type="button"
            className="w-full text-center text-brand-secondary hover:text-brand-primary"
            onClick={() =>
              setSearchInputs((prev) => {
                return prev + 1
              })
            }
          >
            <Center>
              <IconPlus size={14} />
              <Text className="my-4 ml-2 text-sm tracking-wide">
                Add Search Param
              </Text>
            </Center>
          </Anchor>

          <Radio.Group
            value={marchType}
            onChange={setMarchType}
            label="Match Type"
          >
            <Group className="m-2 mb-4">
              <Radio value="and" label="AND" color="violet.4" />
              <Radio value="or" label="OR" color="violet.4" />
            </Group>
          </Radio.Group>

          <Button type="submit" className="block w-full bg-brand-primary">
            Get {searchInputs === 0 ? "All" : "Search"} Companies
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Filter
