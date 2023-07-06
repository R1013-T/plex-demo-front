import React, { useEffect } from 'react'
import { CompanyResponse } from '@/types/company'
import {
  Button,
  Card,
  Center,
  Container,
  createStyles,
  Grid,
  rem,
  ScrollArea,
  Text,
} from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

type Props = {
  data: CompanyResponse
}

type ParamBoxType = {
  label: string
  value?: string | number | boolean
}

const useStyles = createStyles((theme) => ({
  box: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
    }`,
  },
  addNote: {
    outline: `1px solid #5F7ADB`,
    ':hover': {
      backgroundColor: 'rgba(95,122,219,0.40)',
    },
  },
}))

const CompanyDetail = (props: Props) => {
  const { company, notes } = props.data
  const { classes } = useStyles()

  useEffect(() => {
    console.log('company', company)
    console.log('notes', notes)
  }, [])

  const ParamBox: React.FC<ParamBoxType> = ({ label, value }) => {
    const displayValue =
      typeof value === 'boolean' ? (value ? '上場' : '未上場') : value
    return (
      <div className={classes.box}>
        <Text size="sm" mt="sm">
          {label}
        </Text>
        <Text size="xl" mb="xs">
          {displayValue}
        </Text>
      </div>
    )
  }

  const noteCards = () => {
    if (notes.length === 0) return
    return notes.map((note) => {
      return (
        <Card
          key={note.id}
          shadow="sm"
          mt="md"
          padding="md"
          radius="md"
          withBorder
          className="hover:border-brand-secondary/50"
        >
          <Text fz="md">{note.title}</Text>
          <Text size="sm" lineClamp={4} my="xs">
            {note.content}
          </Text>
          <Text size="xs" weight={500} color="gray">
            CreatedAt : {note.createdAt.toLocaleString()}
          </Text>
          <Text size="xs" weight={500} color="gray">
            UpdatedAt : {note.updatedAt.toLocaleString()}
          </Text>
        </Card>
      )
    })
  }

  return (
    <Container className="h-screen-main-inner">
      <ScrollArea className="h-full tracking-wider">
        <Grid m={0}>
          <Grid.Col xs={12} sm={6} className="p-0">
            {Object.entries(company).map(([key, value]) => (
              <ParamBox key={key} label={key} value={value} />
            ))}
          </Grid.Col>
          <Grid.Col xs={12} sm={6} className="p-0">
            <Container>
              <Card
                shadow="sm"
                my="lg"
                padding="md"
                radius="md"
                withBorder
                className={classes.addNote}
              >
                <Center>
                  <IconPlus size="1.3rem" stroke={1.5} className="mr-1" /> Add
                  Note
                </Center>
              </Card>
              {noteCards()}
            </Container>
          </Grid.Col>
        </Grid>
      </ScrollArea>
    </Container>
  )
}

export default CompanyDetail
