// When a user searches for something, then clicks on a pet, then clicks back, we want to show the same search results. We still want to leave our search params form as uncontrolled components
// We need something that's going to have survive state changes between page loads. Redux is perfect for that sort of app state.
import { createSlice } from "@reduxjs/toolkit";

export const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState: {
    value: {
      location: "",
      breed: "",
      animal: "",
    },
  },
  reducers: {
    all: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { all } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
