import {notifications} from "@mantine/notifications";
import {IconUserCheck, IconUserExclamation} from "@tabler/icons-react";

export const successNotification = (
  title: string,
  message: string,
) => {
  notifications.show({
    title: title,
    message: message,
    icon: <IconUserCheck color="#5F7ADB" />,
    autoClose: 6000,
    styles: {
      icon: {
        backgroundColor: 'transparent',
      },
    },
  })
}

export const errorNotification = (
  title: string,
  message: string,
) => {
  notifications.show({
    title: title,
    message: message,
    icon: <IconUserExclamation color="#C82F30" />,
    autoClose: 6000,
    styles: {
      icon: {
        backgroundColor: 'transparent',
      },
    },
  })
}