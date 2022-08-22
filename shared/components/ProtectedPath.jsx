import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
export default function ProtectedPath({ children }) {
  const { token } = useSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (token === "") {
      router.push("/login");
    }
  }, [token]);

  return <>{token ? children : null}</>;
}
