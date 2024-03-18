'use server'

import { getErrorMessage } from '@/lib/utils'
import { getXataClient } from '@/src/xata'
import { z } from 'zod'

const schema = z.object({
  completed: z.boolean().optional(),
  name: z.string().min(5).optional()
})

interface UpdateTaskProps {
  formData: FormData
  taskId: string
}

export async function updateTask({ formData, taskId }: UpdateTaskProps) {
  try {
    const completed = formData.get('completed') === 'true'
    const name = formData.get('name')

    const validatedForm = schema.parse(
      name
        ? {
            name
          }
        : {
            completed
          }
    )
    const xataClient = getXataClient()

    await xataClient.db.tasks.update(taskId, validatedForm)
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }
}
