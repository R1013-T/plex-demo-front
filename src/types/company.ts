import {Note} from "@/types/note";

export type Company = {
  id: number
  code: number
  name: string
  nameKana: string
  listingStatus: boolean
  postalCode: string
  address: string
  phone: string
  representativeName: string
  representativeNameKana: string
  revenue_2020: number
  revenue_2021: number
  revenue_2022: number
  profit_2020: number
  profit_2021: number
  profit_2022: number
  createdAt: string
  updatedAt: string
}

export type CompanyResponse = {
  company: Company
  notes: Note[]
}

export type CompaniesResponse = {
  data: Company[]
}

export type DisplayCompaniesColumns = {
  id?: string
  code?: string
  name?: string
  nameKana?: string
  listingStatus?: string
  postalCode?: string
  address?: string
  phone?: string
  representativeName?: string
  representativeNameKana?: string
  revenue_2020?: string
  revenue_2021?: string
  revenue_2022?: string
  profit_2020?: string
  profit_2021?: string
  profit_2022?: string
  createdAt?: string
  updatedAt?: string
}