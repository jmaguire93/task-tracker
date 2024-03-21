'use client'

import { useQuery } from '@tanstack/react-query'
import { getTasksForUser } from '../server-actions/get-tasks'

export default function useTasks(userId: string) {
  const queryKey = ['tasks', userId]

  return useQuery({
    queryKey,
    queryFn: () => getTasksForUser(userId) || []
  })
}
