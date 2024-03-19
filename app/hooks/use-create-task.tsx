'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTask } from '../server-actions/add-task'

export default function useCreateTask(userId: string) {
  const queryClient = useQueryClient()
  const queryKey = ['tasks', userId]

  return useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey })
    }
  })
}
