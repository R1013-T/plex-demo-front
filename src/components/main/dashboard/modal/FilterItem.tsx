import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Grid, Group, NumberInput, Select, TextInput } from '@mantine/core'

const labels = [
  { label: 'ID', value: 'id', type: 'number'},
  { label: 'Code', value: 'code', type: 'number' },
  { label: 'Company Name', value: 'name', type: 'text' },
  { label: 'Company Name Kana', value: 'name_kana', type: 'text' },
  { label: 'Listing Status', value: 'listing_status', type: 'boolean' },
  { label: 'Postal Code', value: 'postal_code', type: 'text' },
  { label: 'Address', value: 'address', type: 'text' },
  { label: 'Representative Name', value: 'representative_name', type: 'text' },
  {
    label: 'Representative Name Kana',
    value: 'representative_name_kana',
    type: 'text',
  },
  { label: 'Phone', value: 'phone', type: 'text' },
  { label: 'Revenue 2022', value: 'revenue_2022', type: 'number' },
  { label: 'Profit 2022', value: 'profit_2022', type: 'number' },
  { label: 'Revenue 2021', value: 'revenue_2021', type: 'number' },
  { label: 'Profit 2021', value: 'profit_2021', type: 'number' },
  { label: 'Revenue 2020', value: 'revenue_2020', type: 'number' },
]

const selector = {
  text: [
    { label: '=', value: 'eq' },
    { label: '≒', value: 'cont' },
  ],
  number: [
    { label: '=', value: 'eq' },
    { label: '≥', value: 'gteq' },
    { label: '≤', value: 'lteq' },
    { label: '>', value: 'gt' },
    { label: '<', value: 'lt' },
  ],
  boolean: [{ label: '=', value: 'eq' }],
}

const FilterItem = () => {
  const [searchParam, setSearchParam] = useState<string>('')
  const [searchSelector, setSearchSelector] = useState('')
  const [searchValue, setSearchValue] = useState<string | null>('')

  const [searchSelectors, setSearchSelectors] = useState(selector.text)
  const [inputType, setInputType] = useState<string | undefined>('text')

  const handleSearchChange = (value: string) => {
    setSearchParam(value)
    setSearchValue(null)
    const type = labels.find((label) => label.value === value)?.type
    setInputType(type)
    if (type === 'number') {
      setSearchSelector(selector.number[0].value)
      setSearchSelectors(selector.number)
    } else if (type === 'boolean') {
      setSearchSelector(selector.boolean[0].value)
      setSearchSelectors(selector.boolean)
    } else {
      setSearchSelector(selector.text[0].value)
      setSearchSelectors(selector.text)
    }
  }

  const handleSelectorChange = (value: string) => {
    setSearchSelector(value)
  }

  return (
    <Grid mb={10}>
      <Grid.Col span={5} m={0}>
        <Select
          data={labels}
          value={searchParam}
          onChange={handleSearchChange}
          name="searchParam"
        />
      </Grid.Col>
      <Grid.Col span={2} m={0}>
        <Select
          w={70}
          data={searchSelectors}
          value={searchSelector}
          onChange={handleSelectorChange}
          name="searchSelector"
        />
      </Grid.Col>
      <Grid.Col span={5} m={0}>
        {inputType === 'boolean' && (
          <Select
            data={[
              { label: 'true', value: 'true' },
              { label: 'false', value: 'false' },
            ]}
            value={searchValue}
            onChange={(e) => setSearchValue(e)}
            name="searchValue"
          />
        )}
        {inputType === 'text' && (
          <TextInput
            value={searchValue? searchValue : ''}
            onChange={(e) => setSearchValue(e.target.value)}
            name="searchValue"
          />
        )}
        {inputType === 'number' && (
          <NumberInput
            value={Number(searchValue) || 0}
            onChange={(e) => setSearchValue(e.toString())}
            name="searchValue"
          />
        )}
      </Grid.Col>
    </Grid>
  )
}

export default FilterItem
