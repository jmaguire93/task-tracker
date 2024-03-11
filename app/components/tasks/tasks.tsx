import { getTasksForUser } from '@/app/server-actions/get-tasks'
import React from 'react'
import TaskForm from '../task/task-form'
import TaskList from '../task/task-list'

export default async function Tasks({ userId }: { userId: string }) {
  // Get tasks from our server action
  const tasks = await getTasksForUser(userId)

  // Serialize tasks data to JSON format so we can pass it through to the client component as 'plain' objects
  const serializedTasks = JSON.stringify(tasks)

  return (
    <div>
      <h1 className='text-2xl font-bold mb-5'>
        My Tasks ({tasks?.length || 0})
      </h1>
      <TaskForm />
      <TaskList serializedTasks={serializedTasks} />
    </div>
  )
}
