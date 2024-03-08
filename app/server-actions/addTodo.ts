'use server'

import { getXataClient } from '@/src/xata'
import { auth } from '@clerk/nextjs'
import { revalidatePath } from 'next/cache'

interface ValidatedFormData {
  name: string
}

export async function addTodo(formData: ValidatedFormData) {
  const { userId } = auth()

  if (!userId) return

  try {
    const todoToAdd = { ...formData, userId }
    const xataClient = getXataClient()

    await xataClient.db.todos.create(todoToAdd)

    revalidatePath('/')
  } catch (error) {
    // TODO - Add toast messages when using shadcn/ui
  }
}
