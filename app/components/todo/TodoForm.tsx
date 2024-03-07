'use client'

import { addTodo } from '@/app/server-actions/addTodo'
import { Button } from '@/components/ui/button'
import React, { useRef } from 'react'

export default function TodoForm() {
  const ref = useRef<HTMLFormElement>(null)

  return (
    <form
      className='mt-6 flex gap-x-2 items-center'
      ref={ref}
      action={(formData) => {
        addTodo(formData)
        ref.current?.reset()
      }}
    >
      <div className='mb-6 grow'>
        <label
          htmlFor='name'
          className='block text-sm font-semibold mb-1'
          aria-label='New Todo'
        >
          Name
        </label>
        <input
          id='name'
          type='text'
          name='name'
          className='border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500'
        />
      </div>
      <Button
        type='submit'
        className=' font-semibold py-2 px-4 rounded-md transition-colors duration-300 ease-in-out'
      >
        Add Todo
      </Button>
    </form>
  )
}
