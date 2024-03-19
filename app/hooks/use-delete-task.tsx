'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '../server-actions/delete-task'

export default function useDeleteTask(userId: string | undefined) {
  // Access the client
  const queryClient = useQueryClient()
  const queryKey = ['tasks', userId || null]

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey })
    }
  })
}
