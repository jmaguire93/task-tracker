'use server'

import { getXataClient } from '@/src/xata'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  name: z.string()
})

export async function updateName(formData: FormData, todoId: string) {
  const validatedForm = schema.parse({
    name: formData.get('name')
  })
  const xataClient = getXataClient()

  await xataClient.db.todos.update(todoId, validatedForm)

  revalidatePath('/')
}
