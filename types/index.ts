export interface Todo {
    id: string
    user_id: string
    titre: string
    description: string | null
    termine: boolean
    created_at: string
  }