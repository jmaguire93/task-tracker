'use server'

import { getXataClient } from '@/src/xata'
import { revalidatePath } from 'next/cache'

export async function deleteTask(taskId: string) {
  try {
    const xataClient = getXataClient()

    await xataClient.db.todos.delete(taskId)

    revalidatePath('/')
  } catch (error) {}
}
