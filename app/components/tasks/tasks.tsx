'use client'

import useTasks from '@/app/hooks/use-tasks'
import { Button } from '@/components/ui/button'
import { LoaderIcon, RefreshCwIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import TaskForm from '../task/task-form'
import TaskList from '../task/task-list'

export default function Tasks({ userId }: { userId: string }) {
  const { data: tasks, isLoading, error, refetch } = useTasks(userId)

  if (error) {
    toast.error(error.message)
  }

  // Serialize tasks data to JSON format so we can pass it through to the client component as 'plain' objects
  const serializedTasks = tasks ? JSON.stringify(tasks) : '[]'

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold mb-5 flex'>
          My Tasks ({tasks?.length || 0})
        </h1>
        <Button variant='ghost' size='icon' onClick={() => refetch()}>
          <RefreshCwIcon />
        </Button>
      </div>

      <TaskForm userId={userId} refetch={refetch} />
      {isLoading ? (
        <div className='flex justify-center items-center'>
          <LoaderIcon className='animate-spin' />
        </div>
      ) : (
        <TaskList
          serializedTasks={serializedTasks}
          userId={userId}
          refetch={refetch}
        />
      )}
    </div>
  )
}
