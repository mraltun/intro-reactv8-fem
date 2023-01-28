import { createSlice } from "@reduxjs/toolkit";

// Slice is what we're calling a bundle of reducers, state, and action creators.
export const adoptedPetSlice = createSlice({
  name: "adoptedPet",
  initialState: {
    value: null,
  },
  //  You give it any reducers we need in our case, we just want a simple action that sets whatever the payload is to be what's stored. This common. Sometimes you may want to do some processing or math or something like that.
  reducers: {
    adopt: (state, action) => {
      state.value = action.payload;
    },
  },
});

// RTK takes the liberty of making action creators and the actual reducers for us. It basically does this:
// function adopt(pet) { return { type: "adopt", payload: pet} }
export const { adopt } = adoptedPetSlice.actions;

export default adoptedPetSlice.reducer;
