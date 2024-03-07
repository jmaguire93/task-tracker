'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  const { user, isLoaded } = useUser()

  return (
    <>
      <nav className='bg-blue-500 py-4 px-4 flex items-center justify-between mb-5'>
        <div className='flex items-center text-white'>
          <Link href='/'>
            <div className='text-lg uppercase font-bold sm:ml-2'>Todo App</div>
          </Link>
          {user && isLoaded && (
            <Link
              href='/dashboard'
              className='hover:text-gray-200 text-sm ml-4'
            >
              Dashboard
            </Link>
          )}
        </div>
        <div className='text-white flex items-center'>
          {!user && isLoaded && (
            <>
              <Link href='/sign-in' className='hover:text-gray-200 mr-4'>
                Sign In
              </Link>
              <Link href='/sign-up' className='hover:text-gray-200 mr-4'>
                Sign Up
              </Link>
            </>
          )}
          {user && isLoaded && (
            <div className='text-sm mr-3'>Welcome, {user.firstName}</div>
          )}
          <div className='ml-auto'>
            <UserButton afterSignOutUrl='/' />
          </div>
        </div>
      </nav>
    </>
  )
}
