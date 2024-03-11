'use server'

import { getXataClient } from '@/src/xata'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  completed: z.boolean().optional()
})

export async function updateCompleted(formData: FormData, taskId: string) {
  try {
    const completed = formData.get('completed') === 'true'
    const validatedForm = schema.parse({
      completed: completed
    })
    const xataClient = getXataClient()

    await xataClient.db.todos.update(taskId, validatedForm)

    revalidatePath('/')
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update task: ${error.message}`)
    }
    throw new Error('An unexpected error occurred.')
  }
}
