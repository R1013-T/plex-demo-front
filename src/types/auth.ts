export type SignUp = {
  name: string
  email: string
  password: string
  password_confirmation: string
  role: Role | ''
}

export enum Role {
  Manager = 'manager',
  Engineer = 'engineer',
  Designer = 'designer',
  Sales = 'sales',
  Other = 'other',
}

export type SignIn = {
  email: string
  password: string
}

export type User = {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  role: string
  permission: string
  allow_password_change: boolean
  created_at: Date
  updated_at: Date
}

export type GetCurrentUserResponse = {
  isLogin: boolean
  data?: User
  message?: string
}
