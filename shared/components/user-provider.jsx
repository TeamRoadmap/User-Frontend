import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../lib/firebase";

export default function UserProvider({ children }) {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (user !== null && user?.accessToken !== token) {
        console.log(user);

        dispatch({ type: "user/setToken", payload: user?.accessToken });
      } else {
        console.log(user);
        console.log("logged out?");
        router.push("/login");
      }
    }
    return () => {
      ignore = true;
    };
  }, [user, token]);

  return <>{children}</>;
}
