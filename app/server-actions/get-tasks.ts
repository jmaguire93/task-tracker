'use server'

import { getErrorMessage } from '@/lib/utils'
import { getXataClient } from '@/src/xata'
import { Task } from '../util/types/types'

export async function getTasksForUser(userId: string) {
  try {
    const xataClient = getXataClient()
    const tasks = (await xataClient.db.tasks.filter({ userId }).getMany()) || []

    // Serialize tasks to plain objects
    return tasks.map((task) => ({
      id: task.id,
      name: task.name,
      completed: task.completed,
      xata: {
        createdAt: task.xata.createdAt,
        updatedAt: task.xata.updatedAt
      }
    })) as unknown as Task[]
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}
