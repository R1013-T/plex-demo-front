import React from 'react'
import { useCurrentCompanyStore } from '@/store/Companies'
import { CompanyResponse } from '@/types/company'
import { Card, Center, Paper, Text } from '@mantine/core'
import { GroupItem } from './common/GroupItem'

const DetailContact = () => {
  const currentCompany = useCurrentCompanyStore((state) => state.currentCompany)
  const { company } = currentCompany as CompanyResponse

  return (
    <Card withBorder>
      <Card.Section>
        <Text className="p-3 pb-1 text-xl tracking-wider">CONTACT</Text>
      </Card.Section>
      <GroupItem copy={company.phone} >
        <Text>Phone</Text>
        <a href={`tel:${company.phone}`}>{company.phone}</a>
      </GroupItem>
      <GroupItem copy={company.postalCode} >
        <Text>Postal Code</Text>
        <a
          href={`https://www.post.japanpost.jp/cgi-zip/zipcode.php?zip=${company.postalCode}`}
          target="_blank"
        >
          {company.postalCode}
        </a>
      </GroupItem>
      <GroupItem copy={company.address} nonBorder={true} >
        <Text>Address</Text>
        <Text>{company.address}</Text>
      </GroupItem>
      <Paper mt="sm" p="xl">
        <Center>google map</Center>
      </Paper>
    </Card>
  )
}

export default DetailContact
