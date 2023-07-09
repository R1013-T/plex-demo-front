import { create } from 'zustand'

type isUpdatedNoteStore = {
  isUpdatedNote: boolean
  setIsUpdatedNote: (isUpdatedNote: boolean) => void
}

export const useIsUpdatedNoteStore = create<isUpdatedNoteStore>((set) => ({
  isUpdatedNote: false,
  setIsUpdatedNote: (isUpdatedNote: boolean) => set({ isUpdatedNote }),
}))