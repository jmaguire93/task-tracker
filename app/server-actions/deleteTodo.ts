'use server'

import { getXataClient } from '@/src/xata'
import { revalidatePath } from 'next/cache'

export async function deleteTodo(todoId: string) {
  const xataClient = getXataClient()

  await xataClient.db.todos.delete(todoId)

  revalidatePath('/')
}
