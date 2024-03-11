'use client'

import { ClerkProvider as GeneralClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import * as React from 'react'

export function ClerkProvider({
  children,
  ...props
}: { children: React.ReactNode }) {
  const { theme } = useTheme()

  return (
    <GeneralClerkProvider
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined
      }}
      {...props}
    >
      {children}
    </GeneralClerkProvider>
  )
}
