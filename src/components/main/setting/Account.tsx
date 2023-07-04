import React from 'react';
import {useUserStore} from "@/store/auth";

const Account = () => {
  const user = useUserStore((state) => state.user)

  return (
    <div>
      <p>name: {user?.name}</p>
      <p>email: {user?.email}</p>
      <p>role: {user?.role}</p>
      <p>permission: {user?.permission}</p>
    </div>
  );
};

export default Account;
