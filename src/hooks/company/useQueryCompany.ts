import client from "@/lib/api/client";
import Cookies from "js-cookie";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import useStore from "@/hooks/useStore";
import {useSignedInStore, useUserStore} from "@/store/auth";
import {CompaniesResponse, CompanyResponse} from "@/types/company";
import {useCurrentCompanyStore} from "@/store/Companies";

export const useQueryCompany = (id:number) => {
  const queryClient = useQueryClient()
  const updateUser = useUserStore((state) => state.updateUser)
  const signedInStore = useStore(useSignedInStore, (state) => state);
  const setCurrentCompany = useCurrentCompanyStore(
    (state) => state.setCurrentCompany
  )

  const getCompany = async () => {
    const { data, headers } = await client.get(`/companies/${id}`, {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    });

    return data;
  }

  return useQuery<CompanyResponse, Error>({
    queryKey: ['company', id],
    queryFn: getCompany,
    onSuccess: (data) => {
      setCurrentCompany(data)
    },
    onError: (error: any) => {
      if (error.response?.status === 401) {
        updateUser(undefined)
        signedInStore?.setSignedIn(false)
        queryClient.removeQueries(['user'])
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");
      }
    }
  })
}