import { useRouter } from "next/router";
import axios from "axios";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {GetCurrentUserResponse, User} from "@/types/auth";
import Cookies from "js-cookie";
import client from "@/lib/api/client";
import useStore from "@/hooks/useStore";
import {useSignedInStore, useUserStore} from "@/store/auth";

export const useQueryCurrentUser = () => {
  const router = useRouter();
  const signedInStore = useStore(useSignedInStore, (state) => state);
  const queryClient = useQueryClient()


  const getCurrentUser = async () => {
    if (
      !Cookies.get("_access_token") ||
      !Cookies.get("_client") ||
      !Cookies.get("_uid")
    ) {
      signedInStore?.setSignedIn(false);
      return;
    }

    const { data, headers } = await client.get("/auth/sessions", {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    });

    return data;
  };

  return useQuery<GetCurrentUserResponse, Error>({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    onError: (error: any) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        signedInStore?.setSignedIn(false);
        queryClient.removeQueries(['user'])
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");
      }
    },
  });
};
