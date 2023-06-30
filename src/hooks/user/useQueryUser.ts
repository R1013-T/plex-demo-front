import { useRouter } from "next/router";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {GetCurrentUserResponse, User} from "@/types/auth";
import Cookies from "js-cookie";
import client from "@/lib/api/client";
import useStore from "@/hooks/useStore";
import {useSignedInStore, useUserStore} from "@/store/auth";

export const useQueryUser = () => {
  const router = useRouter();
  const signedInStore = useStore(useSignedInStore, (state) => state);

  const getCurrentUser = async () => {
    if (
      !Cookies.get("_access_token") ||
      !Cookies.get("_client") ||
      !Cookies.get("_uid")
    ) {
      signedInStore?.setSignedIn(false);
      router.push("/auth");
      return;
    }

    const { data } = await client.get("/auth/sessions", {
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
        router.push("/auth");
      }
    },
  });
};

export const getCurrentUser = () => {
  if (
    !Cookies.get("_access_token") ||
    !Cookies.get("_client") ||
    !Cookies.get("_uid")
  )
    return;
  return client.get("/auth/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
