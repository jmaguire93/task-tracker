'use server'

import { getXataClient } from '@/src/xata'
import { revalidatePath } from 'next/cache'

export async function deleteTask(taskId: string) {
  try {
    const xataClient = getXataClient()

    await xataClient.db.todos.delete(taskId)

    revalidatePath('/')
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete task: ${error.message}`)
    }
    throw new Error('An unexpected error occurred.')
  }
}
