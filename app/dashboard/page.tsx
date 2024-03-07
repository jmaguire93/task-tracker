import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import TodoForm from '../components/todo/TodoForm'
import TodoList from '../components/todo/TodoList'
import { getTodosForUser } from '../server-actions/getTodos'

const DashboardPage = async () => {
  const { userId } = auth()

  // if not authenticated, redirect back to home
  if (!userId) {
    redirect('/')
  }

  // Get todos from our server action
  const todos = await getTodosForUser(userId)

  // Serialize todos data to JSON format so we can pass it through to the client component as 'plain' objects
  const serializedTodos = JSON.stringify(todos)

  return (
    <div className='container w-full'>
      <h1 className='text-2xl font-bold mb-5'>
        My Todos ({todos?.length || 0})
      </h1>
      <TodoForm />
      <TodoList serializedTodos={serializedTodos} />
    </div>
  )
}

export default DashboardPage
