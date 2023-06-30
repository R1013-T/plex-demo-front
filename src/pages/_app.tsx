import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import useStore from '@/hooks/useStore'
import { useSignedInStore } from '@/store/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const signedInStore = useStore(useSignedInStore, (state) => state)

  useEffect(() => {
    if (signedInStore?.signedIn === undefined) return
    if (signedInStore?.signedIn) {
      router.push('/')
    } else {
      router.push('/auth')
    }
  }, [signedInStore?.signedIn])

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
          fontFamily: 'Roboto, ans-serif',
          globalStyles: (theme) => ({
            body: {
              backgroundColor: '#26292B',
            },
          }),
          components: {
            Input: {
              styles: (theme) => ({
                input: {
                  ':focus': {
                    borderColor: '#5F7ADB',
                  },
                },
              }),
            },
            Button: {
              styles: {
                root: {
                  ':hover': {
                    backgroundColor: '#A2B2EE',
                  },
                },
              },
            },
          },
        }}
      >
        <Notifications />
        <Component {...pageProps} />
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
