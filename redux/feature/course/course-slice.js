import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  voted: {},
  course: [],
  section: [],
  sectionData: [],
  courses: [],
  // contain all the courses's data in an array of object.
};
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setVote: (state, action) => {
      state.voted = action.payload;
    },
    resetVote: (state) => {
      state.vote = undefined;
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setSection: (state, action) => {
      state.section = action.payload;
    },
    setSectionData: (state, action) => {
      state.sectionData = action.payload;
    },
    resetSection: (state, action) => {
      state.sectionData = [];
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
  },
});

// export const { setUser } = userSlice.actions;
export default courseSlice.reducer;
