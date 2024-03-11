'use server'

import { getXataClient } from '@/src/xata'

export async function getTasksForUser(userId: string) {
  try {
    const xataClient = getXataClient()

    return xataClient.db.todos.filter({ userId }).getMany()
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to retrieve the tasks: ${error.message}`)
    }
    throw new Error('An unexpected error occurred.')
  }
}
