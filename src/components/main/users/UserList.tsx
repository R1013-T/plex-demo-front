import React, { useState } from 'react'
import {
  Container,
  createStyles,
  Modal,
  rem,
  ScrollArea,
  Table,
} from '@mantine/core'
import {useEditedUsersStore, useUsersStore} from '@/store/users'

type Props = {
  open: () => void
  setModalTitle: (title: string) => void
}

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}))

const UserList = (props: Props) => {
  const users = useUsersStore((state) => state.users)
  const setEditedUser = useEditedUsersStore((state) => state.setEditedUser)

  const { classes, cx } = useStyles()
  const [scrolled, setScrolled] = useState(false)

  if (!users) {
    return <div>Users not found</div>
  }

  const labels = ['id', 'name', 'email', 'role', 'permission']

  const rows = users.map((row, index) => (
    <tr
      key={index}
      onClick={() => {
        setEditedUser(row)
        props.setModalTitle('User Edit')
        props.open()
      }}
    >
      <td>{row.id}</td>
      <td>{row.name}</td>
      <td>{row.email}</td>
      <td>{row.role}</td>
      <td>{row.permission}</td>
    </tr>
  ))

  return (
    <ScrollArea
      className="h-[calc(100vh-3rem)] rounded px-2 pb-20 pt-2"
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table striped highlightOnHover withBorder>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            {labels.map((label: string, index) => (
              <th key={index}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}

export default UserList
