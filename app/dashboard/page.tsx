import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const DashboardPage = () => {
  const { userId } = auth()

  // if not authenticated, redirect back to home
  if (!userId) {
    redirect('/')
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-5'>My Todos</h1>
    </div>
  )
}

export default DashboardPage
