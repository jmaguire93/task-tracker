'use server'

import { getXataClient } from '@/src/xata'

export async function getTodos() {
  const xataClient = getXataClient()

  return xataClient.db.todos.getMany()
}
