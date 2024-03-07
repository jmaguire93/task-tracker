'use server'

import { getXataClient } from '@/src/xata'
import { revalidatePath } from 'next/cache'

export async function deleteTodo(todoId: string) {
  try {
    const xataClient = getXataClient()

    await xataClient.db.todos.delete(todoId)

    revalidatePath('/')
  } catch (error) {}
}
