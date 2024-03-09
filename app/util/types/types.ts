export interface Task {
  id: string
  name: string
  completed: boolean
  xata: {
    createdAt: string
    updatedAt: string
  }
}
