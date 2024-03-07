'use client'

import React from 'react'
import TodoItem from './TodoItem'

interface Todo {
  id: string
  name: string
  completed: boolean
}

export default function TodoList({
  serializedTodos
}: { serializedTodos: string }) {
  const todos = JSON.parse(serializedTodos) as Todo[]

  return (
    <div className='overflow-y-auto h-[500px]'>
      {todos.length === 0 ? (
        <div>All caught up! Want to add a new todo?</div>
      ) : (
        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  )
}
