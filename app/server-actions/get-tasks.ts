'use server'

import { getXataClient } from '@/src/xata'

export async function getTasksForUser(userId: string) {
  try {
    const xataClient = getXataClient()

    return xataClient.db.todos.filter({ userId }).getMany()
  } catch (error) {}
}
