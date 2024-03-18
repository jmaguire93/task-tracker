import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { Toaster } from 'sonner'
import Footer from './components/footer'
import Header from './components/header'
import Providers from './components/providers'
import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn('min-h-screen font-sans antialiased', fontSans.variable)}
      >
        <Providers>
          <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='container flex-1'>
              <div className='mt-10'>{children}</div>
            </main>
            <Footer />
          </div>
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  )
}
