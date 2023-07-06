import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type DisplayCompaniesColumnsStore = {
  displayCompaniesColumns: string[]
  setDisplayCompaniesColumns: (displayCompaniesColumns: string[]) => void
}
export const useDisplayCompaniesColumnsStore = create(
  persist<DisplayCompaniesColumnsStore>(
    (set) => ({
      displayCompaniesColumns: [
        'code',
        'listingStatus',
        'name',
        'address',
        'phone',
        'representativeName',
        'revenue_2020',
        'revenue_2021',
        'revenue_2022',
        'profit_2020',
        'profit_2021',
        'profit_2022',
      ],
      setDisplayCompaniesColumns: (displayCompaniesColumns: string[]) =>
        set({ displayCompaniesColumns }),
    }),
    {
      name: 'companies-display-columns',
    }
  )
)
