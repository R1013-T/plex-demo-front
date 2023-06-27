import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import {useRouter} from "next/router";
import {getCurrentUser} from "@/lib/api/auth";
import { useAuthStore } from "@/store/auth";
import {useLoadingStore} from "@/store/common";
import useStore from "@/hooks/useStore";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const userStore = useStore(useAuthStore, (state) => state);
  const setLoading = useLoadingStore((state) => state.setLoading);

  const handleGetCurrentUser = async () => {
    setLoading(true)

    try {

      const res = await getCurrentUser()
      console.log("getCurrentUser res: ",res);

      if (res?.data.isLogin) {
        console.log("login");
        userStore?.updateUser(res.data.data);
        router.push("/");
      } else {
        console.log("not login");
        router.push("/auth");
      }

    } catch (error) {
      console.log("getCurrentUser error: ",error);
      // router.push("/auth");
    }

    setLoading(false)
  }

  useEffect(() => {
    console.log("user_: ",userStore?.user);
    if (userStore?.user) {
      router.push("/")
    } else {
      handleGetCurrentUser()
    }
  }, [userStore?.user]);

  return <Component {...pageProps} />;
}
