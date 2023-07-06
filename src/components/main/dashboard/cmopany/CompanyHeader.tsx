import React from 'react'
import { Center, Grid, Group } from '@mantine/core'
import {
  IconArrowLeft,
  IconEdit,
  IconRefresh,
  IconTrash,
} from '@tabler/icons-react'
import {Company} from "@/types/company";

type Props = {
  isEdit: boolean
  setIsEdit: (isEdit: boolean) => void
  setDetailId: (id: number ) => void
  currentCompany: Company
}
const CompanyHeader = (props: Props) => {
  const handleTrash = () => {
    console.log('trash')
  }

  const handleRefresh = () => {
    console.log('refresh')
  }

  const handleEdit = () => {
    props.setIsEdit(!props.isEdit)
  }

  const headerItems = [
    { icon: IconTrash, click: handleTrash, active: false },
    { icon: IconRefresh, click: handleRefresh, active: false },
    { icon: IconEdit, click: handleEdit, active: props.isEdit },
  ]


  return (
    <section className="h-12 w-full shadow-2xl">
      <Grid m={0}>
        <Grid.Col span={6} className="p-0">
          <Group spacing={0} position="left" className="h-12 w-full pl-2">
            <IconArrowLeft
              size="2rem"
              stroke={1.3}
              onClick={() => props.setDetailId(0)}
            />
            <ruby className='pl-1 tracking-wider' >
              {props.currentCompany.name}
              <rt>{props.currentCompany.nameKana}</rt>
            </ruby>
          </Group>
        </Grid.Col>
        <Grid.Col span={6} className="p-0">
          <Group spacing={0} position="right" className="h-12 w-full pr-2">
            {headerItems.map((item, index) => {
              return (
                <item.icon
                  size="1.3rem"
                  stroke={1.5}
                  className={`mx-2 ${
                    item.active
                      ? 'text-brand-primary'
                      : 'hover:text-brand-secondary'
                  }`}
                  key={index}
                  onClick={item.click}
                />
              )
            })}
          </Group>
        </Grid.Col>
      </Grid>
    </section>
  )
}

export default CompanyHeader
