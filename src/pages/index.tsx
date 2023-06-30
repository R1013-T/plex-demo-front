import { useEffect } from "react";
import useStore from "@/hooks/useStore";
import { signOut } from "@/lib/api/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useQueryUser } from "@/hooks/user/useQueryUser";
import { User } from "@/types/auth";

export default function Home() {
  const router = useRouter();

  const { data, status } = useQueryUser();

  const handleLogout = async () => {
    try {
      const res = await signOut();

      console.log("sign out res: ", res);

      if (res.data.success) {
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        // updateUser(undefined);

        router.push("/auth");
      } else {
        console.log("error: ", res.data.errors);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    console.log("status: ", status);
    console.log("data: ", data);

    if (status === "success" && data?.isLogin === false) {
      console.log("not login");
      router.push("/auth");
    }
  }, [data, status]);

  if (status === "loading") {
    return <div>loading...</div>;
  }

  return (
    <main>
      {data?.data?.name}
      <br />
      <button onClick={handleLogout}>logout</button>
    </main>
  );
}
