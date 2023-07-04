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
    <article className="min-h-screen overflow-hidden w-full">
      <Head>
        <title>{title ? title + " - Mantine" : title}</title>
      </Head>
      <Header />
      <main className='flex w-full' >
        <Nav />
        {children}
      </main>
    </article>
  )
}