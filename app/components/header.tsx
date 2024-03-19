import { UserButton, currentUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ThemeSwitcher } from './theme-switcher/theme-switcher'

export default async function Header() {
  const user = await currentUser()

  return (
    <>
      <nav className='bg-default border-b py-4 px-4 flex items-center justify-between mb-5 text-sm'>
        <div className='flex items-center'>
          <Link href='/'>
            <Image
              src='/logo/app-logo.png'
              alt='App Logo'
              width={40}
              height={40}
            />
          </Link>
          {user && (
            <Link
              href='/dashboard'
              className='ml-4  hover:text-accent-foreground'
            >
              Dashboard
            </Link>
          )}
        </div>
        <div className='flex items-center'>
          <div className='mr-2'>
            <ThemeSwitcher />
          </div>
          {!user && (
            <>
              <Link href='/sign-in' className='hover:text-gray-200 mr-4'>
                Sign In
              </Link>
              <Link href='/sign-up' className='hover:text-gray-200 mr-4'>
                Sign Up
              </Link>
            </>
          )}
          {user && (
            <div className='text-sm mr-3'>
              Welcome, {user.firstName || 'User'}
            </div>
          )}
          <div className='ml-auto'>
            <UserButton afterSignOutUrl='/' />
          </div>
        </div>
      </nav>
    </>
  )
}
