export const runLogoutTimer = (dispatch, timer) => {
  setTimeout(() => {
    dispatch({ type: "user/setLogOut" });
  }, timer);
};
