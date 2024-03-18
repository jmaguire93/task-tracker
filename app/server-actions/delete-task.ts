'use server'

import { getErrorMessage } from '@/lib/utils'
import { getXataClient } from '@/src/xata'

export async function deleteTask(taskId: string) {
  try {
    const xataClient = getXataClient()

    await xataClient.db.tasks.delete(taskId)
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }
}
