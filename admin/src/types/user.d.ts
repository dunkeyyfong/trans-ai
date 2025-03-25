type User = {
    createdAt: string | number | Date
    id: number
    email: string
    name: string
    role: 'ADMIN' | 'USER'
    verifyToken: string
  }