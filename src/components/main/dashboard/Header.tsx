import React, { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import {
  Modal,
  Button,
  Center,
  Grid,
  Group,
  Menu,
  TextInput,
  Container,
} from '@mantine/core'
import {
  IconChevronDown,
  IconColumns3,
  IconFilter,
  IconRefresh,
  IconRowInsertTop,
  IconSearch,
} from '@tabler/icons-react'
import { PiFileCsvDuotone } from 'react-icons/pi'
import DisplayColumns from '@/components/main/dashboard/modal/DisplayColumns'
import Filter from '@/components/main/dashboard/modal/Filter'
import { useQueryClient } from '@tanstack/react-query'
import {successDatabaseNotification} from "@/utils/notifications/db";
import InsertRow from './modal/InsertRow'

const Header = () => {
  const queryClient = useQueryClient()

  const [opened, { open, close }] = useDisclosure(false)
  const [modalState, setModalState] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const handleChangeDisplayColumns = () => {
    setModalState('displayColumns')
    setModalTitle('Display Columns')
    open()
  }
  const handleFilter = () => {
    setModalState('filter')
    setModalTitle('Filter')
    open()
  }

  const handleRefresh = () => {
    queryClient.invalidateQueries(['companies']).then(() => {
      successDatabaseNotification("Successful Data Retrieval ✅", "The company data has been successfully retrieved. ")
    })
  }

  const handleInsertRow = () => {
    setModalState('InsertRow')
    setModalTitle('Insert Row')
    open()
  }

  const handleImportCsvData = () => {
    alert('import csv data')
  }

  return (
    <div className="min-h-[3rem] w-full overflow-hidden shadow-2xl">
      <Modal opened={opened} onClose={close} title={modalTitle} size="calc(100vw - 3rem)" centered>
        <Container>
          {modalState === 'displayColumns' && <DisplayColumns />}
          {modalState === 'filter' && <Filter />}
          {modalState === 'InsertRow' && <InsertRow close={close} />}
        </Container>
      </Modal>
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
            <IconColumns3
              size="1.3rem"
              stroke={1.5}
              className="hover:text-brand-secondary"
              onClick={handleChangeDisplayColumns}
            />
            <IconFilter
              size="1.3rem"
              stroke={1.5}
              className="hover:text-brand-secondary"
              onClick={handleFilter}
            />
            <IconRefresh
              size="1.3rem"
              stroke={1.5}
              className="hover:text-brand-secondary"
              onClick={handleRefresh}
            />
            <Menu>
              <Menu.Target>
                <Button
                  h="2rem"
                  className="mr-2 bg-brand-primary px-2 text-sm font-medium"
                >
                  <IconChevronDown
                    size="1.3rem"
                    stroke={1.5}
                    className="mr-1"
                  />
                  Insert
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconRowInsertTop size={14} />}
                  onClick={handleInsertRow}
                >
                  Insert row
                </Menu.Item>
                <Menu.Item
                  icon={<PiFileCsvDuotone size={14} />}
                  onClick={handleImportCsvData}
                >
                  Import data from CSV
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Grid.Col>
      </Grid>
    </div>
  )
}

export default Header
