import React, { useEffect } from 'react'
import { CompanyResponse } from '@/types/company'
import { Grid, Group, ScrollArea, Stack } from '@mantine/core'
import DetailTitle from '@/components/main/dashboard/cmopany/detailCommon/DetailTitle'
import DetailContact from '@/components/main/dashboard/cmopany/detailCommon/DetailContact'
import DetailFinancial from '@/components/main/dashboard/cmopany/detailCommon/DetailFinancial'
import DetailNotes from '@/components/main/dashboard/cmopany/detailCommon/DetailNotes'
import DetailProfile from '@/components/main/dashboard/cmopany/detailCommon/DetailProfile'
import { useCurrentCompanyStore } from '@/store/Companies'

const CompanyDetail = () => {
  const currentCompany = useCurrentCompanyStore((state) => state.currentCompany)
  const { company, notes } = currentCompany as CompanyResponse

  return (
    <ScrollArea className="flex h-screen-main-inner w-screen-main flex-wrap px-2 tracking-wider">
      <Stack>
        <DetailTitle />
        <Grid>
          <Grid.Col xs={12} sm={6}>
            <DetailProfile />
          </Grid.Col>
          <Grid.Col xs={12} sm={6}>
            <DetailContact />
          </Grid.Col>
        </Grid>
        <DetailFinancial />
        <DetailNotes />
      </Stack>
    </ScrollArea>
  )
}

export default CompanyDetail
