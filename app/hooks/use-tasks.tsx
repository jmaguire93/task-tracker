'use client'

import { useQuery } from '@tanstack/react-query'
import { getTasksForUser } from '../server-actions/get-tasks'

export default function useTasks(userId: string) {
  const queryKey = ['tasks', userId || null]
  const {
    data: tasks,
    isLoading,
    error
  } = useQuery({
    queryKey,
    queryFn: () => getTasksForUser(userId) || []
  })

  return {
    tasks,
    isLoading,
    error
  }
}
