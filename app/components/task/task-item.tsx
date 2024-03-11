'use client'

import { deleteTask } from '@/app/server-actions/delete-task'
import { updateCompleted } from '@/app/server-actions/update-completed'
import { updateName } from '@/app/server-actions/update-name'
import { Task } from '@/app/util/types/types'
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
import { toast } from 'sonner'

interface TaskItemProps {
  task: Task
  index: number
}

export default function TaskItem(props: TaskItemProps) {
  const { task, index } = props

  const [isCompleted, setIsCompleted] = useState(task.completed)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(task.name)
  const [createdTime, setCreatedTime] = useState('')
  const [updatedTime, setUpdatedTime] = useState('')

  const handleCheckboxChange = async (checked: boolean) => {
    setIsCompleted(checked)
    const formData = new FormData()
    formData.append('completed', checked.toString())

    try {
      // Type-safe and validated.
      await updateCompleted(formData, task.id)

      toast.success(
        `Task has been marked as ${checked ? 'Completed' : 'Incomplete'}`
      )
      setIsEditing(false)
    } catch (error: unknown) {
      toast.error((error as Error).message || 'Failed to update the task.')
    }
  }

  const handleNameChange = async () => {
    const formData = new FormData()
    formData.append('name', name)

    try {
      // Type-safe and validated.
      await updateName(formData, task.id)

      toast.success('Successfully updated the task')
      setIsEditing(false)
    } catch (error: unknown) {
      toast.error((error as Error).message || 'Failed to update the task.')
    }
  }

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleNameChange()
    }
  }

  const handleDeleteTask = async () => {
    try {
      await deleteTask(task.id)

      toast.success('Successfully deleted the task.')
    } catch (error: unknown) {
      toast.error((error as Error).message || 'Failed to delete the task.')
    }
  }

  useEffect(() => {
    setCreatedTime(
      formatDistance(new Date(task.xata.createdAt), new Date(), {
        addSuffix: true
      })
    )
    setUpdatedTime(
      formatDistance(new Date(task.xata.updatedAt), new Date(), {
        addSuffix: true
      })
    )
  }, [task.xata.createdAt, task.xata.updatedAt])

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
            onClick={handleDeleteTask}
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
