'use client'

import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const onThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button onClick={onThemeToggle} variant='ghost' size='icon'>
      <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
