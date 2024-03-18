'use server'

import { getErrorMessage } from '@/lib/utils'
import { getXataClient } from '@/src/xata'
import { auth } from '@clerk/nextjs'

interface ValidatedFormData {
  name: string
}

export async function addTask(formData: ValidatedFormData) {
  const { userId } = auth()

  if (!userId) return

  try {
    const taskToAdd = { ...formData, userId }
    const xataClient = getXataClient()

    await xataClient.db.tasks.create(taskToAdd)
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }
}
