import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { MantineProvider } from '@mantine/core'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})
export default function App({ Component, pageProps }: AppProps) {
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
                  }
                },
              }
            }
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
