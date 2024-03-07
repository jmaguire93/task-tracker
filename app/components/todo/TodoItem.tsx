'use client'

import { deleteTodo } from '@/app/server-actions/deleteTodo'
import { updateCompleted } from '@/app/server-actions/updateCompleted'
import { updateName } from '@/app/server-actions/updateName'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { formatDistance } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { Todo } from './TodoList'

export default function TodoItem({ todo }: { todo: Todo }) {
  const [isCompleted, setIsCompleted] = useState(todo.completed)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(todo.name)
  const [createdTime, setCreatedTime] = useState('')
  const [updatedTime, setUpdatedTime] = useState('')

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted)
    const formData = new FormData()
    formData.append('completed', (!isCompleted).toString())
    updateCompleted(formData, todo.id)
  }

  const handleNameChange = () => {
    const formData = new FormData()
    formData.append('name', name)

    updateName(formData, todo.id)
    setIsEditing(false)
  }

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleNameChange()
    }
  }

  useEffect(() => {
    setCreatedTime(
      formatDistance(new Date(todo.xata.createdAt), new Date(), {
        addSuffix: true
      })
    )
    setUpdatedTime(
      formatDistance(new Date(todo.xata.updatedAt), new Date(), {
        addSuffix: true
      })
    )
  }, [todo.xata.createdAt, todo.xata.updatedAt])

  return (
    <Card className='flex flex-col justify-between bg-secondary'>
      <CardHeader>
        <CardTitle>
          <div>
            {isEditing ? (
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleNameChange}
                onKeyDown={handleKeyPress}
              />
            ) : (
              <div
                className='text-xl'
                onClick={() => setIsEditing(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsEditing(true)
                  }
                }}
              >
                {name}
              </div>
            )}
          </div>
        </CardTitle>
        <CardDescription>
          Created: {createdTime}
          <br />
          Updated: {updatedTime}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <div className='justify-between flex-1 flex'>
          <form
            action={() => {
              deleteTodo(todo.id)
            }}
          >
            <input type='hidden' name='id' value={todo.id} />
            <Button
              type='submit'
              className='bg-red-500 hover:bg-red-700 font-bold'
            >
              Delete
            </Button>
          </form>
          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              id='completed'
              name='completed'
              checked={isCompleted}
              onChange={handleCheckboxChange}
              className='cursor-pointer rounded-sm'
            />
            <label
              className={`${isCompleted ? 'line-through text-gray-500' : ''}`}
            >
              Completed
            </label>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
