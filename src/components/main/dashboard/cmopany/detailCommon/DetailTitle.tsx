import React from 'react'
import { useCurrentCompanyStore } from '@/store/Companies'
import { CompanyResponse } from '@/types/company'
import {Container, createStyles, Group, rem, Text} from '@mantine/core'

const useStyles = createStyles((theme) => ({
  item: {
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
    }`,

  }
}))

const DetailTitle = () => {
  const currentCompany = useCurrentCompanyStore((state) => state.currentCompany)
  const { company } = currentCompany as CompanyResponse
  const { classes } = useStyles()

  const formatIsoDate = (isoDateString: string) => {
    const date = new Date(isoDateString);
    return date.toLocaleDateString('ja-JP');
  }

  const companyDetails = [
    { label: 'id', value: company.id },
    { label: 'createdAt', value: formatIsoDate(company.createdAt) },
    { label: 'updatedAt', value: formatIsoDate(company.updatedAt) },
  ];

  return (
    <Group position="apart" pt="md" pb="xs">
      <ruby className="pl-1 text-2xl tracking-widest">
        {company.name}
        <rt className="text-base">{company.nameKana}</rt>
      </ruby>
      <Group>
        {companyDetails.map((detail) => (
          <Container key={detail.label} className={classes.item} >
            <Text size="xs" className='opacity-60' >
              {detail.label}
            </Text>
            <Text size="md">
              {detail.value}
            </Text>
          </Container>
        ))}
      </Group>
    </Group>
  )
}

export default DetailTitle
