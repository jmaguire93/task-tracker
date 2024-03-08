'use client'

import { addTodo } from '@/app/server-actions/addTodo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const formSchema = z.object({
  name: z.string().min(5, {
    message: 'Todo must be at least 5 characters.'
  })
})

export default function TodoForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Type-safe and validated.
    addTodo(values)
    form.reset()
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
              <FormLabel>Todo</FormLabel>
              <FormControl>
                <Input placeholder='Enter your todo...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Add Todo</Button>
      </form>
    </Form>
  )
}
