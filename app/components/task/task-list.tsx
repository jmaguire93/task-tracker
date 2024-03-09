'use client'

import { Task } from '@/app/util/types/types'
import React from 'react'
import TaskItem from './task-item'

export default function TaskList({
  serializedTasks
}: { serializedTasks: string }) {
  const tasks = JSON.parse(serializedTasks) as Task[]

  return (
    <div className='overflow-y-auto h-[550px]'>
      {tasks.length === 0 ? (
        <div>All caught up! Want to add a new task?</div>
      ) : (
        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4'>
          {tasks.map((task, index) => (
            <TaskItem index={index} key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}
