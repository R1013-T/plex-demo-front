import React from 'react'
import { useCurrentCompanyStore } from '@/store/Companies'
import { CompanyResponse } from '@/types/company'
import { Button, Card, CopyButton, Text } from '@mantine/core'
import { GroupItem } from './common/GroupItem'

const DetailProfile = () => {
  const currentCompany = useCurrentCompanyStore((state) => state.currentCompany)
  const { company } = currentCompany as CompanyResponse

  return (
    <Card withBorder pb="lg">
      <Card.Section>
        <Text className="p-3 pb-1 text-xl tracking-wider">PROFILE</Text>
      </Card.Section>
      <GroupItem copy={company.code.toString()}>
        <Text>Code</Text>
        <Text>{company.code}</Text>
      </GroupItem>
      <GroupItem copy={company.representativeName}>
        <Text>Representative</Text>
        <ruby>
          {company.representativeName}
          <rt className="text-sm">{company.representativeNameKana}</rt>
        </ruby>
      </GroupItem>
      <GroupItem copy={company.listingStatus ? '上場' : '未上場'} >
        <Text>Listing Status</Text>
        <Text>{company.listingStatus ? '上場' : '未上場'}</Text>
      </GroupItem>
    </Card>
  )
}

export default DetailProfile
