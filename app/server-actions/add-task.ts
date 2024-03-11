'use server'

import { getXataClient } from '@/src/xata'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

interface ValidatedFormData {
  name: string
}

export async function addTask(formData: ValidatedFormData) {
  const { userId } = auth()

  if (!userId) return

  try {
    const taskToAdd = { ...formData, userId }
    const xataClient = getXataClient()

    await xataClient.db.todos.create(taskToAdd)

    revalidatePath('/')
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to add task: ${error.message}`)
    }
    throw new Error('An unexpected error occurred.')
  }
}
