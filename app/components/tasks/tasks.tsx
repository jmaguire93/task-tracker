'use client'

import useTasks from '@/app/hooks/use-tasks'
import { LoaderIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import TaskForm from '../task/task-form'
import TaskList from '../task/task-list'

export default function Tasks({ userId }: { userId: string }) {
  const { tasks, isLoading, error } = useTasks(userId)

  if (isLoading) {
    return (
      <div className='flex justify-center items-center'>
        <LoaderIcon className='animate-spin' />
      </div>
    )
  }

  if (error) {
    return toast.error(error.message)
  }

  // Serialize tasks data to JSON format so we can pass it through to the client component as 'plain' objects
  const serializedTasks = JSON.stringify(tasks)

  return (
    <div>
      <h1 className='text-2xl font-bold mb-5 flex'>
        My Tasks (
        {isLoading ? (
          <LoaderIcon className='animate-spin' />
        ) : (
          <>{tasks?.length || 0}</>
        )}
        )
      </h1>
      <TaskForm />
      {isLoading ? (
        <div className='flex justify-center items-center'>
          <LoaderIcon className='animate-spin' />
        </div>
      ) : (
        <TaskList serializedTasks={serializedTasks} />
      )}
    </div>
  )
}
