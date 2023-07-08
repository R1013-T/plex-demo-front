import { notifications } from '@mantine/notifications'
import { BsDatabaseCheck, BsDatabaseExclamation } from 'react-icons/bs'

export const successDatabaseNotification = (title: string, message: string) => {
  notifications.show({
    title: title,
    message: message,
    icon: <BsDatabaseCheck size={23} color="#5F7ADB" />,
    autoClose: 6000,
    styles: {
      icon: {
        backgroundColor: 'transparent',
      },
    },
  })
}

export const errorDatabaseNotification = (title: string, message: string) => {
  notifications.show({
    title: title,
    message: message,
    icon: <BsDatabaseExclamation size={23} color="#C82F30" />,
    autoClose: 6000,
    styles: {
      icon: {
        backgroundColor: 'transparent',
      },
    },
  })
}
