'use client'

import useCreateTask from '@/app/hooks/use-create-task'
import { Task } from '@/app/util/types/types'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryObserverResult } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(5, {
    message: 'Task must be at least 5 characters.'
  })
})

export default function TaskForm({
  userId,
  refetch
}: {
  userId: string
  refetch: () => Promise<QueryObserverResult<Task[], Error>>
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  })

  const createTask = useCreateTask(userId)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!userId) {
      return
    }

    const result = await createTask.mutateAsync(values)

    if (result?.error) {
      toast.error(result?.error)
      return
    }

    await refetch()
    form.reset()
    toast.success('Successfully added the task.')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 flex space-x-2 mb-6'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='grow'>
              <FormLabel>Task</FormLabel>
              <FormControl>
                <Input placeholder='Enter your task...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Add Task</Button>
      </form>
    </Form>
  )
}
