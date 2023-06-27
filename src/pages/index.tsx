import {useAuthStore} from "@/store/auth";
import {useEffect} from "react";
import useStore from "@/hooks/useStore";
import {signOut} from "@/lib/api/auth";
import Cookies from "js-cookie";
import {useRouter} from "next/router";

export default function Home() {
  const router = useRouter()

  const userStore = useStore(useAuthStore, (state) => state);

  useEffect(() => {
    console.log("user: ",userStore?.user);
  }, []);

  const handleLogout = async () => {
    try {

      const res = await signOut()

      console.log("sign out res: ",res);

      if (res.data.success) {
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        userStore?.updateUser(undefined)

        router.push("/auth")

      } else {
        console.log("error: ",res.data.errors);
      }


    } catch (error) {
      console.log("error: ",error);
    }
  }

  return (
    <main>
      <p>
        {userStore?.user?.name}
        <br/>
        {userStore?.user?.email}
      </p>
      <button onClick={handleLogout} >logout</button>
    </main>
  );
}
