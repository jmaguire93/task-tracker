'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTask } from '../server-actions/update-task'

export default function useUpdateTask(userId: string | undefined) {
  const queryClient = useQueryClient()
  const queryKey = ['tasks', userId || null]

  return useMutation({
    mutationFn: updateTask,
    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey })
    }
  })
}
