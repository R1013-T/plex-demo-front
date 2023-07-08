import React from 'react'
import { Button, Container, Grid, Group, Modal, Text } from '@mantine/core'
import { IconArrowLeft, IconEdit, IconTrash } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'

type Props = {
  isEdit: boolean
  setIsEdit: (isEdit: boolean) => void
  setDetailId: (id: number) => void
}
const CompanyHeader = (props: Props) => {
  const [opened, { open, close }] = useDisclosure(false)

  const handleTrash = () => {
    open()
  }

  const handleMoveTrash = () => {
    alert('Under development')
    props.setDetailId(0)
    close()
  }

  const handleEdit = () => {
    props.setIsEdit(!props.isEdit)
  }

  const headerItems = [
    { icon: IconTrash, click: handleTrash, active: false },
    { icon: IconEdit, click: handleEdit, active: props.isEdit },
  ]

  return (
    <section className="h-12 w-full shadow-2xl">
      <Modal opened={opened} onClose={close} title="Move to Trash" centered>
        <Container>
          <Text>
            Are you sure you want to move the selected data to the trash?
          </Text>
          <Button color="red" className="mt-3 w-full p-0 hover:bg-red-400" onClick={handleMoveTrash} >
            Move to Trash
          </Button>
        </Container>
      </Modal>

      <Grid m={0}>
        <Grid.Col span={6} className="p-0">
          <Group spacing={0} position="left" className="h-12 w-full pl-2">
            <IconArrowLeft
              size="2rem"
              stroke={1.3}
              onClick={() => props.setDetailId(0)}
            />
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
