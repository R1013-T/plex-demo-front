import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {Company, CompanyResponse, SearchCompaniesParams, SearchParams} from '@/types/company'

type CompaniesStore = {
  companies: Company[] | null
  setCompanies: (companies: Company[]) => void
}

type DisplayCompaniesColumnsStore = {
  displayCompaniesColumns: string[]
  setDisplayCompaniesColumns: (displayCompaniesColumns: string[]) => void
}

type CurrentCompanyStore = {
  currentCompany: CompanyResponse | null
  setCurrentCompany: (currentCompany: CompanyResponse) => void
}

type isUpdatedCompanyStore = {
  isUpdatedCompany: boolean
  setIsUpdatedCompany: (isUpdatedCompany: boolean) => void
}

type SearchCompaniesParamsStore = {
  searchCompaniesParams: SearchParams | null
  setSearchCompaniesParams: (searchCompaniesParams: SearchParams) => void
}

export const useCompaniesStore = create<CompaniesStore>((set) => ({
  companies: null,
  setCompanies: (companies: Company[]) => set({ companies }),
}))

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

export const useCurrentCompanyStore = create<CurrentCompanyStore>((set) => ({
  currentCompany: null,
  setCurrentCompany: (currentCompany: CompanyResponse) =>
    set({ currentCompany }),
}))

export const useIsUpdatedCompanyStore = create<isUpdatedCompanyStore>(
  (set) => ({
    isUpdatedCompany: false,
    setIsUpdatedCompany: (isUpdatedCompany: boolean) =>
      set({ isUpdatedCompany }),
  })
)

export const useSearchCompaniesStore = create<SearchCompaniesParamsStore>((set) => ({
  searchCompaniesParams: {
    match: "and",
    queries: {}
  },
  setSearchCompaniesParams: (searchCompaniesParams: SearchParams) =>
    set({ searchCompaniesParams }),
}))
