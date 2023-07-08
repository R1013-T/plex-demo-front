import React, { useEffect, useState } from 'react'
import { keys } from '@mantine/utils'
import { createStyles, rem, ScrollArea, Table } from '@mantine/core'
import { Company, DisplayCompaniesColumns } from '@/types/company'
import useStore from '@/hooks/useStore'
import {
  useCompaniesStore,
  useDisplayCompaniesColumnsStore,
  useIsUpdatedCompanyStore,
} from '@/store/Companies'
import { useRouter } from 'next/router'
import { useQueryClient } from '@tanstack/react-query'

type Props = {
  setDetailId: (id: number) => void
}

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}))
const CompanyList = (props: Props) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const displayColumns = useStore(
    useDisplayCompaniesColumnsStore,
    (state) => state
  )
  const companies = useCompaniesStore((state) => state.companies)
  const isUpdatedCompany = useIsUpdatedCompanyStore((state) => state)

  const { classes, cx } = useStyles()
  const [scrolled, setScrolled] = useState(false)

  const [displayParams, setDisplayParams] = useState<DisplayCompaniesColumns[]>(
    []
  )

  useEffect(() => {
    const display = displayColumns?.displayCompaniesColumns
    if (!display) return

    if (isUpdatedCompany?.isUpdatedCompany || !companies) {
      queryClient.invalidateQueries(['companies'])
      isUpdatedCompany?.setIsUpdatedCompany(false)
      return
    }

    const displayParams = companies.map((company) => {
      const currentCompany: DisplayCompaniesColumns = {}
      const companyKeys = Object.keys(company) as (keyof Company)[]
      for (let key of companyKeys) {
        if (display.includes(key)) {
          if (key === 'listingStatus') {
            currentCompany[key] = company[key] ? '上場' : '未上場'
          } else if (typeof company[key] === 'number') {
            currentCompany[key] = company[key].toString()
          } else {
            currentCompany[key] = company[key] ? company[key].toString() : ''
          }
        }
      }
      return currentCompany
    })

    setDisplayParams(displayParams)
  }, [
    displayColumns?.displayCompaniesColumns,
    companies,
    isUpdatedCompany?.isUpdatedCompany,
  ])

  const labels = keys(displayParams[0] || '')

  const rows = displayParams.map((row, index) => (
    <tr key={index} onClick={() => props.setDetailId(companies![index].id)}>
      {Object.values(row).map((value, index) => (
        <td key={index}>{value}</td>
      ))}
    </tr>
  ))

  return (
    <ScrollArea
      className="h-[calc(100vh-3rem)] rounded px-2 pb-20 pt-2"
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table striped highlightOnHover withBorder>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            {labels.map((label: string, index) => (
              <th key={index}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}

export default CompanyList
