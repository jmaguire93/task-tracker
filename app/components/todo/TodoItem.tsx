'use client'

import { deleteTodo } from '@/app/server-actions/deleteTodo'
import { updateCompleted } from '@/app/server-actions/updateCompleted'
import { updateName } from '@/app/server-actions/updateName'
import React, { useState } from 'react'

interface Todo {
  id: string
  name: string
  completed: boolean
}

export default function TodoItem({ todo }: { todo: Todo }) {
  const [isCompleted, setIsCompleted] = useState(todo.completed)
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(todo.name)

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted)
    const formData = new FormData()
    formData.append('completed', (!isCompleted).toString())
    updateCompleted(formData, todo.id)
  }

  const handleNameChange = () => {
    const formData = new FormData()
    formData.append('name', value)

    updateName(formData, todo.id)
    setIsEditing(false)
  }

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleNameChange()
    }
  }

  return (
    <div className='mb-4 p-4 bg-gray-200 rounded-lg shadow md:w-72 h-40 flex flex-col justify-between'>
      <form>
        {isEditing ? (
          <input
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleNameChange}
            onKeyDown={handleKeyPress}
          />
        ) : (
          <h2
            className='text-xl mb-2'
            onClick={() => setIsEditing(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setIsEditing(true)
              }
            }}
          >
            {value}
          </h2>
        )}
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='completed'
            name='completed'
            checked={isCompleted}
            onChange={handleCheckboxChange}
            className='cursor-pointer rounded-sm text-green-500 border-green-500 focus:ring-green-400 focus:border-green-400'
          />
          <label
            className={`${isCompleted ? 'line-through text-gray-500' : ''}`}
          >
            Completed
          </label>
        </div>
      </form>
      <form
        action={() => {
          deleteTodo(todo.id)
        }}
      >
        <input type='hidden' name='id' value={todo.id} />
        <button
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          type='submit'
        >
          Delete
        </button>
      </form>
    </div>
  )
}
