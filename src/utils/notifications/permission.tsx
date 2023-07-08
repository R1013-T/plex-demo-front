import { notifications } from '@mantine/notifications'
import { IconUserCancel } from '@tabler/icons-react'

export const ngUserNotification = (title: string, message: string) => {
  notifications.show({
    title: title,
    message: message,
    icon: <IconUserCancel color="#C82F30" />,
    autoClose: 6000,
    styles: {
      icon: {
        backgroundColor: 'transparent',
      },
    },
  })
}
