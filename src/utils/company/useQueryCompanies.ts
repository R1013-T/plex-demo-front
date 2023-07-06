import client from "@/lib/api/client";
import Cookies from "js-cookie";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import useStore from "@/hooks/useStore";
import {useSignedInStore, useUserStore} from "@/store/auth";
import {CompaniesResponse, Company} from "@/types/company";

export const useQueryCompanies = () => {
  const queryClient = useQueryClient()
  const updateUser = useUserStore((state) => state.updateUser)
  const signedInStore = useStore(useSignedInStore, (state) => state);

  const getCompanies = async () => {
    const { data, headers } = await client.get("/companies", {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    });

    return data;
  }

  return useQuery<CompaniesResponse, Error>({
    queryKey: ["companies"],
    queryFn: getCompanies,
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