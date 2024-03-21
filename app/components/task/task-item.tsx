'use client'

import useDeleteTask from '@/app/hooks/use-delete-task'
import useUpdateTask from '@/app/hooks/use-update-task'
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
import { QueryObserverResult } from '@tanstack/react-query'
import { formatDistance } from 'date-fns'
import { LoaderIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface TaskItemProps {
  task: Task
  index: number
  userId: string
  refetch: () => Promise<QueryObserverResult<Task[], Error>>
}

export default function TaskItem(props: TaskItemProps) {
  const { task, index, userId, refetch } = props

  const [deleting, setDeleting] = useState<boolean>(false)
  const [isCompleted, setIsCompleted] = useState(task.completed)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(task.name)
  const [createdTime, setCreatedTime] = useState('')
  const [updatedTime, setUpdatedTime] = useState('')
  const deleteTask = useDeleteTask(userId)
  const updateTask = useUpdateTask(userId)

  const handleCheckboxChange = async (checked: boolean) => {
    const formData = new FormData()
    formData.append('completed', checked.toString())

    const result = await updateTask.mutateAsync({
      formData: formData,
      taskId: task.id
    })

    if (result?.error) {
      toast.error(result.error)
      return
    }

    refetch()
    setIsCompleted(checked)

    toast.success(
      `Task has been marked as ${checked ? 'Completed' : 'Incomplete'}`
    )
  }

  const handleNameChange = async () => {
    const formData = new FormData()
    formData.append('name', name)

    const result = await updateTask.mutateAsync({
      formData: formData,
      taskId: task.id
    })

    if (result?.error) {
      toast.error(result.error)
      return
    }

    refetch()
    setIsEditing(false)

    toast.success('Successfully updated the task')
  }

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === 'Enter') {
      handleNameChange()
    }
  }

  const handleDeleteTask = async () => {
    setDeleting(true)
    const result = await deleteTask.mutateAsync(task.id)

    if (result?.error) {
      toast.error(result.error)
      return
    }

    await refetch()
    setDeleting(false)
    toast.success('Successfully deleted the task.')
  }

  useEffect(() => {
    setName(task.name)
    setIsCompleted(task.completed)
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
  }, [task])

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
            disabled={deleting}
            onClick={handleDeleteTask}
            className='bg-red-500 hover:bg-red-700 font-bold'
          >
            {deleting ? <LoaderIcon className='animate-spin' /> : 'Delete'}
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
