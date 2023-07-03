import { FC, ReactNode } from 'react'
import Head from 'next/head'
import Header from "@/components/layouts/Header";
import Nav from "@/components/layouts/Nav";

type Props = {
  title?: string
  children: ReactNode
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <div className="min-h-screen overflow-hidden">
      <Head>
        <title>{title ? title + " - Mantine" : title}</title>
      </Head>
      <Header />
      <main className='flex' >
        <Nav />
        {children}
      </main>
    </div>
  )
}