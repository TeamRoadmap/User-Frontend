import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function UserProvider() {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  // const user = auth.currentUser;

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        dispatch({ type: "user/setToken", payload: idTokenResult.token });
      }
    });
    return () => unsubscribe();
  }, []);
  return null;

  // useEffect(() => {
  //   let ignore = false;
  //   if (!ignore) {
  //     if (user !== null && user?.accessToken !== token) {
  //       dispatch({ type: "user/setToken", payload: user?.accessToken });
  //     } else {
  //       console.log(user);
  //       console.log("logged out?");
  //       router.push("/login");
  //     }
  //   }
  //   return () => {
  //     ignore = true;
  //   };
  // }, [user, token]);

  return <>{children}</>;
}
