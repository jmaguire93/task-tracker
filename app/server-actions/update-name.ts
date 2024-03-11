'use server'

import { getXataClient } from '@/src/xata'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(5)
})

export async function updateName(formData: FormData, taskId: string) {
  try {
    const validatedForm = schema.parse({
      name: formData.get('name')
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
