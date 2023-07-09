import React, { useEffect } from 'react'
import { CompanyResponse } from '@/types/company'
import { Grid, Group, ScrollArea, Stack } from '@mantine/core'
import DetailTitle from '@/components/main/dashboard/cmopany/detailCommon/DetailTitle'
import DetailContact from '@/components/main/dashboard/cmopany/detailCommon/DetailContact'
import DetailFinancial from '@/components/main/dashboard/cmopany/detailCommon/DetailFinancial'
import DetailNotes from '@/components/main/dashboard/cmopany/detailCommon/DetailNotes'
import DetailProfile from '@/components/main/dashboard/cmopany/detailCommon/DetailProfile'
import { useCurrentCompanyStore } from '@/store/Companies'
import { useIsUpdatedNoteStore } from '@/store/notes'
import { useQueryClient } from '@tanstack/react-query'
import { useLoadingStore } from '@/store/common'

const CompanyDetail = () => {
  const queryClient = useQueryClient()
  const currentCompany = useCurrentCompanyStore((state) => state.currentCompany)
  const isUpdatedNote = useIsUpdatedNoteStore((state) => state)

  useEffect(() => {
    if (isUpdatedNote?.isUpdatedNote) {
      queryClient.invalidateQueries(['company', currentCompany?.company.id])
      isUpdatedNote.setIsUpdatedNote(false)
    }
  }, [isUpdatedNote?.isUpdatedNote])

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
