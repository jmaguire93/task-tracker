import { auth } from '@clerk/nextjs'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import React from 'react'
import Tasks from '../components/tasks/tasks'
import { getTasksForUser } from '../server-actions/get-tasks'

export default async function DashboardPage() {
  const { userId } = auth()

  // if not authenticated, redirect back to home
  if (!userId) {
    redirect('/')
  }

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['tasks', userId],
    queryFn: () => getTasksForUser(userId)
  })

  return (
    <div className='px-0 sm:px-8'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Tasks userId={userId} />
      </HydrationBoundary>
    </div>
  )
}
