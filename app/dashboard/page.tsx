import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import Tasks from '../components/tasks/tasks'

const DashboardPage = () => {
  const { userId } = auth()

  // if not authenticated, redirect back to home
  if (!userId) {
    redirect('/')
  }

  return (
    <div className='px-2 sm:px-8'>
      <Tasks userId={userId} />
    </div>
  )
}

export default DashboardPage
