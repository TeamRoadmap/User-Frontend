import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vote: undefined,
  // contain all the courses's data in an array of object.
};
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setVote: (state, action) => {
      state.vote = action.payload;
    },
  },
});

// export const { setUser } = userSlice.actions;
export default courseSlice.reducer;
