import React from 'react'
import { Navbar, Center, Tooltip, Stack } from '@mantine/core'
import Image from 'next/image'
import {IconArticle, IconChartBar, IconNotes, IconSettings, IconTrash, IconUsersGroup} from '@tabler/icons-react'
import useStore from '@/hooks/useStore'
import { useActivePageStore } from '@/store/common'
import SignOutButton from '@/components/auth/SignOutButton'

interface NavbarLinkProps {
  icon: React.FC<any>
  label: string
  active?: boolean
  onClick?(): void
}

const Nav = () => {
  const activePageStore = useStore(useActivePageStore, (state) => state)

  function NavbarItem({ icon: Icon, label, onClick }: NavbarLinkProps) {
    return (
      <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
        <Center
          className={`h-10 w-10 cursor-pointer rounded ${
            activePageStore?.activePage === label &&
            'bg-brand-primary/30 text-brand-primary'
          }`}
          onClick={() => activePageStore?.setActivePage(label)}
        >
          <Icon size="1.3rem" stroke={1.5} />
        </Center>
      </Tooltip>
    )
  }

  const navItems = [
    { icon: IconArticle, label: 'Dashboard' },
    { icon: IconChartBar, label: 'Charts' },
    { icon: IconNotes, label: 'Notes' },
    { icon: IconUsersGroup, label: 'Users' },
    { icon: IconTrash, label: 'Trash'},
    { icon: IconSettings, label: 'Settings' },
  ]

  const items = navItems.map((item) => (
    <Center key={item.label}>
      <NavbarItem icon={item.icon} label={item.label} />
    </Center>
  ))

  return (
    <nav className="h-screen-main w-20">
      <Navbar width={{ base: 80 }} p="md" height="100%">
        <Center mt={10}>
          <Image
            src="/images/demo_icon.svg"
            alt="logo"
            width={30}
            height={30}
          />
        </Center>
        <Navbar.Section grow mt={50}>
          <Stack justify="center">{items}</Stack>
        </Navbar.Section>
        <Navbar.Section>
          <Stack justify="center" spacing={0}>
            <Center>
              <SignOutButton />
            </Center>
          </Stack>
        </Navbar.Section>
      </Navbar>
    </nav>
  )
}

export default Nav
