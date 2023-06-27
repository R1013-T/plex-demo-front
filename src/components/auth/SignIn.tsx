import React, { useState } from "react";
import {useRouter} from "next/router";
import Cookies from "js-cookie";
import {signIn} from "@/lib/api/auth";

import useStore from "@/hooks/useStore";
import {useLoadingStore} from "@/store/common";
import {useAuthStore} from "@/store/auth";

const SignIn = () => {
  const router = useRouter();

  const setLoading = useLoadingStore((state) => state.setLoading);
  const userStore = useStore(useAuthStore, (state) => state);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const params = {
      email,
      password,
    }

    console.log("params: ",params);

    try {

      const res = await signIn(params)
      console.log("sign in res: ",res);

      if (res.status === 200) {

        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        console.log("res.data.data: ",res.data.data);

        userStore?.updateUser(res.data.data);

        console.log("login");

        router.push("/");


      } else {

        console.log("not login");

      }



    } catch (error) {
      console.log(error);
    }

    setLoading(false)

  };

  return (
    <div>
      <p>Sign In</p>

      <form onSubmit={(e) => handleSubmit(e)} >
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          className="block border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="block border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default SignIn;
