import {
  Button,
  Center,
  CopyButton,
  createStyles,
  Grid,
  Group,
  rem,
} from '@mantine/core'
import React from 'react'
import { IconClipboard, IconClipboardCheck } from '@tabler/icons-react'

type GroupItemProps = {
  children: React.ReactNode
  copy?: string
  nonBorder?: boolean
}

const useStyles = createStyles((theme) => ({
  item: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
    }`,
  },
}))
export const GroupItem = ({ children, copy, nonBorder }: GroupItemProps) => {
  const { classes } = useStyles()
  return (
    <Grid className={nonBorder ? '' : classes.item} p="xs" pb={4}>
      <Grid.Col span={11} pb={0} pr={0}>
        <Group position="apart">{children}</Group>
      </Grid.Col>
      <Grid.Col span={1} p={0}>
        <Center className="h-full">
          {copy && (
            <CopyButton value={copy}>
              {({ copied, copy }) => (
                <div
                  onClick={copy}
                  className="translate-x-2 translate-y-2 hover:text-brand-secondary"
                >
                  {copied ? (
                    <IconClipboardCheck
                      size="1.3rem"
                      stroke={1.3}
                      className="text-brand-primary"
                    />
                  ) : (
                    <IconClipboard size="1.3rem" stroke={1.3} />
                  )}
                </div>
              )}
            </CopyButton>
          )}
        </Center>
      </Grid.Col>
    </Grid>
  )
}
