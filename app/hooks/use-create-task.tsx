'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTask } from '../server-actions/add-task'

export default function useCreateTask(userId: string | undefined) {
  const queryClient = useQueryClient()
  const queryKey = ['tasks', userId || null]

  return useMutation({
    mutationFn: addTask,
    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey })
    }
  })
}
