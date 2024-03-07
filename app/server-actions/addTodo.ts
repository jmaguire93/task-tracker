'use server'

import { getXataClient } from '@/src/xata'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(5)
})

export async function addTodo(formData: FormData, userId: string) {
  try {
    const validatedForm = schema.parse({
      name: formData.get('name')
    })
    const todoToAdd = { ...validatedForm, userId }
    const xataClient = getXataClient()

    await xataClient.db.todos.create(todoToAdd)

    revalidatePath('/')
  } catch (error) {
    // TODO - Add toast messages when using shadcn/ui
  }
}
