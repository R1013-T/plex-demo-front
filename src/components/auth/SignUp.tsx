import React, { useState } from "react";
import { signUp } from "@/lib/api/auth";
import Cookies from "js-cookie";
import { useLoadingStore } from "@/store/common";
import useStore from "@/hooks/useStore";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/router";

const SignUp = () => {
  const router = useRouter();

  const setLoading = useLoadingStore((state) => state.setLoading);
  const userStore = useStore(useAuthStore, (state) => state);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("other");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      role,
    };
    console.log("params: ", params);

    setLoading(true);

    try {
      const res = await signUp(params);
      console.log("sign up res: ", res);

      if (res.status === 200) {
        console.log("sign up success");

        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        userStore?.updateUser(res.data.data);

        router.push("/");
      } else {
        console.log("sign up error");
      }
    } catch (error) {
      console.log("error: ", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <p>Sign Up</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="password confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <br />
        <select name="role" id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="manager">manager</option>
          <option value="engineer">engineer</option>
          <option value="designer">designer</option>
          <option value="sales">sales</option>
          <option value="other">other</option>
        </select>
        <br />
        <button type="submit">新規登録</button>
      </form>
    </div>
  );
};

export default SignUp;
