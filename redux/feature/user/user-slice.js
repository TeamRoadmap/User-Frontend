import { createSlice } from "@reduxjs/toolkit";
import { loginHandler, signUpHandler } from "./thunk";

const initialState = {
  user: {}, // contain all the user's data in object in short (users janam kundali)
  token: "",
  isAuth: false,
  loading: false,
  error: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetList: (state) => {
      return (state = []);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpHandler.fulfilled, (state, action) => {
        state.loading = true;
        state.user = action.payload;
      })
      .addCase(signUpHandler.rejected, (state, action) => {
        state.loading = false;
        state.user = undefined;
        state.error = action.payload?.message;
      })
      .addCase(loginHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginHandler.fulfilled, (state, action) => {
        state.loading = true;
        state.user = action.payload;
      })
      .addCase(loginHandler.rejected, (state, action) => {
        state.loading = false;
        state.user = undefined;
        state.error = action.payload?.message;
      })
      .addCase("user/logout", (state) => {
        state.loading = false;
        state.token = "";
        state.user = {};
        state.error = "";
      });
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
