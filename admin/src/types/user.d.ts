type User = {
    id: number
    email: string
    name: string
    role: 'ADMIN' | 'USER'
    verifyToken: string
  }