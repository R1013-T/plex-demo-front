import React from 'react'
import { Button, Center, Grid, Group, TextInput } from '@mantine/core'
import { IconPlus, IconRefresh, IconSearch } from '@tabler/icons-react'

type Props = {
  open: () => void
  setModalTitle: (title: string) => void
}

const Header = (props: Props) => {
  return (
    <div className="min-h-[3rem] w-full overflow-hidden shadow-2xl">
      <Grid m={0}>
        <Grid.Col xs={12} sm={8} className="p-0">
          <Center className="m-0 h-12 w-full p-0">
            <TextInput
              placeholder="Search by any field"
              icon={<IconSearch size="0.9rem" stroke={1.5} />}
              className="m-0 mx-2 w-full"
            />
          </Center>
        </Grid.Col>
        <Grid.Col xs={12} sm={4} className="p-0">
          <Group position="right" align="center" className="h-12">
            <IconRefresh
              size="1.3rem"
              stroke={1.5}
              className="hover:text-brand-secondary"
              // onClick={handleRefresh}
            />
            <Button
              h="2rem"
              className="mr-2 bg-brand-primary px-2 text-sm font-medium"
              onClick={() => {
                props.setModalTitle('User Create')
                props.open()
              }}
            >
              <IconPlus size="1.3rem" stroke={1.5} className="mr-1" />
              Add User
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default Header
