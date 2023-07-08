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

export type SearchCompaniesParams = {
  id_eq?: number,
  id_gteq?: number,
  id_lteq?: number,
  id_gt?: number,
  id_lt?: number,
  code_eq?: number,
  code_gteq?: number,
  code_lteq?: number,
  code_gt?: number,
  code_lt?: number,
  listing_status?: string
  name_eq?: string,
  name_cont?: string,
  postal_code_eq?: string,
  postal_code_cont?: string,
  address_eq?: string,
  address_cont?: string,
  phone_eq?: string,
  phone_cont?: string,
  representative_name_eq?: string,
  representative_name_cont?: string,
  representative_name_kana_eq?: string,
  representative_name_kana_cont?: string,
  revenue_2020_eq?: number,
  revenue_2020_gteq?: number,
  revenue_2020_lteq?: number,
  revenue_2020_gt?: number,
  revenue_2020_lt?: number,
  revenue_2021_eq?: number,
  revenue_2021_gteq?: number,
  revenue_2021_lteq?: number,
  revenue_2021_gt?: number,
  revenue_2021_lt?: number,
  revenue_2022_eq?: number,
  revenue_2022_gteq?: number,
  revenue_2022_lteq?: number,
  revenue_2022_gt?: number,
  revenue_2022_lt?: number,
  profit_2020_eq?: number,
  profit_2020_gteq?: number,
  profit_2020_lteq?: number,
  profit_2020_gt?: number,
  profit_2020_lt?: number,
  profit_2021_eq?: number,
  profit_2021_gteq?: number,
  profit_2021_lteq?: number,
  profit_2021_gt?: number,
  profit_2021_lt?: number,
  profit_2022_eq?: number,
  profit_2022_gteq?: number,
  profit_2022_lteq?: number,
  profit_2022_gt?: number,
  profit_2022_lt?: number,
}

export type SearchParams = {
  match: string
  queries: SearchCompaniesParams
}