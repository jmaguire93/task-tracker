import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import TaskForm from '../components/task/task-form'
import TaskList from '../components/task/task-list'
import { getTasksForUser } from '../server-actions/get-tasks'

const DashboardPage = async () => {
  const { userId } = auth()

  // if not authenticated, redirect back to home
  if (!userId) {
    redirect('/')
  }

  // Get tasks from our server action
  const tasks = await getTasksForUser(userId)

  // Serialize tasks data to JSON format so we can pass it through to the client component as 'plain' objects
  const serializedTasks = JSON.stringify(tasks)

  return (
    <div className='px-2 sm:px-8'>
      <h1 className='text-2xl font-bold mb-5'>
        My Tasks ({tasks?.length || 0})
      </h1>
      <TaskForm />
      <TaskList serializedTasks={serializedTasks} />
    </div>
  )
}

export default DashboardPage
