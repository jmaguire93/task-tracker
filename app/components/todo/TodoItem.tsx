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
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatDistance } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { Todo } from './TodoList'

interface TodoItemProps {
  todo: Todo
  index: number
}

export default function TodoItem(props: TodoItemProps) {
  const { todo, index } = props

  const [isCompleted, setIsCompleted] = useState(todo.completed)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(todo.name)
  const [createdTime, setCreatedTime] = useState('')
  const [updatedTime, setUpdatedTime] = useState('')

  const handleCheckboxChange = (checked: boolean) => {
    setIsCompleted(checked)
    const formData = new FormData()
    formData.append('completed', checked.toString())
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
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleNameChange}
                onKeyDown={handleKeyPress}
                id='name'
                type='text'
                name='name'
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
          <Button
            type='submit'
            onClick={() => deleteTodo(todo.id)}
            className='bg-red-500 hover:bg-red-700 font-bold'
          >
            Delete
          </Button>
          <div className='flex items-center gap-2'>
            <Checkbox
              id={`completed-${index}`}
              checked={isCompleted}
              onCheckedChange={handleCheckboxChange}
            />
            <Label
              htmlFor={`completed-${index}`}
              className={`${
                isCompleted ? 'line-through opacity-50' : ''
              } text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
            >
              Completed
            </Label>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
