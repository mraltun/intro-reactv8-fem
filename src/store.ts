import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./adoptedPetSlice";
import searchParams from "./searchParamsSlice";
import { petApi } from "./petApiService";

const store = configureStore({
  reducer: {
    adoptedPet,
    searchParams,
    // We need to add our reducer to our store. RTK query will cache our responses directly in our Redux store for us with its generated reducers but we do need to add it to our store
    [petApi.reducerPath]: petApi.reducer,
  },
  // The middleware isn't strictly necessary but it does allow for additional feature like caching, invalidation, refetching, etc. I just always add it. But your app with basic caching does work without the middleware.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(petApi.middleware),
});

export default store;
