import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";
import { useState } from "react";
import {useLoadingStore} from "@/store/common";

const Auth = () => {
  const loading = useLoadingStore((state) => state.loading);

  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div>
      <p>auth</p>
      {isSignUp ? <SignUp /> : <SignIn />}
      <button className='mt-10' onClick={() => setIsSignUp((prevState) => !prevState)}>
        {isSignUp ? "ログイン" : "新規登録"}
      </button>
      {loading && <p>loading...</p>}
    </div>
  );
};

export default Auth;
