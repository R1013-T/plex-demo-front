import React, { FC } from 'react'
import {Card, Center, createStyles, Grid, Group, Paper, rem, Text} from '@mantine/core'
import { useCurrentCompanyStore } from '@/store/Companies'
import { CompanyResponse } from '@/types/company'

type RenderItemsProps = {
  label: string
  items: { label: string; value: number; noBorder?: boolean }[]
  border?: boolean
}

const useStyles = createStyles((theme) => ({
  box: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
    }`,
  },
  item: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
    }`,
  },
}))

const DetailFinancial = () => {
  const currentCompany = useCurrentCompanyStore((state) => state.currentCompany)
  const { company } = currentCompany as CompanyResponse
  const { classes } = useStyles()

  const revenues = [
    { label: '2020', value: company.profit_2020 },
    { label: '2021', value: company.profit_2021 },
    { label: '2022', value: company.profit_2022, noBorder: true },
  ]
  const profits = [
    { label: '2020', value: company.profit_2020 },
    { label: '2021', value: company.profit_2021 },
    { label: '2022', value: company.profit_2022, noBorder: true },
  ]

  const RenderItems: FC<RenderItemsProps> = ({ label, items, border }) => {
    return (
      <div className={border ? classes.box : ''}>
        <Text fz="md" mb={2}>
          {label}
        </Text>
        <div className="flex">
          {items.map((item) => (
            <div key={item.label} className={item.noBorder ? '' : classes.item}>
              <Text fz="xs" px="xs" className="opacity-60">
                {item.label}
              </Text>
              <Text fz="sm" px="xs">
                {item.value}
              </Text>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Card withBorder>
      <Card.Section>
        <Text className="p-3 pb-1 text-xl tracking-wider">FINANCIAL</Text>
      </Card.Section>
      <div>
        <Grid>
          <Grid.Col xs={12} sm={6}>
            <RenderItems label="Revenues" items={revenues} border={true} />
          </Grid.Col>
          <Grid.Col xs={12} sm={6}>
            <RenderItems label="Profits" items={profits} />
          </Grid.Col>
        </Grid>
      </div>
      <Paper className='w-full mt-4 p-10' >
        <Center>
          chart
        </Center>
      </Paper>
    </Card>
  )
}

export default DetailFinancial
