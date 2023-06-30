import client from "@/lib/api/client";
import Cookies from "js-cookie";

import { SignUp, SignIn } from "@/types/auth";

export const signUp = (params: SignUp) => {
  return client.post("/auth", params);
};

export const signIn = (params: SignIn) => {
  return client.post("/auth/sign_in", params);
};

export const signOut = () => {
  return client.delete("/auth/sign_out", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
