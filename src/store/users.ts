import { create } from 'zustand'
import { User } from '@/types/auth'

type UsersStore = {
  users: User[] | null
  setUsers: (users: User[]) => void
}

type EditedUserStore = {
  editedUser: User | null
  setEditedUser: (user: User) => void
}

type IsUpdatedUserStore = {
  isUpdatedUser: boolean
  setIsUpdatedUser: (isUpdatedUser: boolean) => void
}

export const useUsersStore = create<UsersStore>((set) => ({
  users: null,
  setUsers: (users: User[]) => set({ users }),
}))

export const useEditedUsersStore = create<EditedUserStore>((set) => ({
  editedUser: null,
  setEditedUser: (editedUser: User) => set({ editedUser }),
}))

export const useIsUpdatedUserStore = create<IsUpdatedUserStore>((set) => ({
  isUpdatedUser: false,
  setIsUpdatedUser: (isUpdatedUser: boolean) => set({ isUpdatedUser }),
}))
