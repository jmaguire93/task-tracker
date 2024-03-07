'use server'

import { getXataClient } from '@/src/xata'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  completed: z.boolean().optional()
})

export async function updateCompleted(formData: FormData, todoId: string) {
  const completed = formData.get('completed') === 'true'

  const validatedForm = schema.parse({
    completed: completed
  })
  const xataClient = getXataClient()

  await xataClient.db.todos.update(todoId, validatedForm)

  revalidatePath('/')
}
