import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// With RTK query we build these services around base URLs. In this case, our API is all on the same path so it all works out well. You then build endpoints which have their own sort of URL builders.
export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://pets-v2.dev-apis.com" }),
  endpoints: (builder) => ({
    // We built a getPet endpoint. It takes in an ID and then uses that as a URL query parameter. So with that with an ID of 4 the URL built would be the baseUrl + the endpoint url + the params so http://pets-v2.dev-apis.com/pets?id=4
    getPet: builder.query({
      query: (id) => ({ url: "pets", params: { id } }),
      // "transformResponse" is so you can extract the actual part of the response you want to keep. We just want the first pet in the pets array so we nab that
      transformResponse: (response) => response.pets[0],
    }),
    getBreeds: builder.query({
      query: (animal) => ({ url: "breeds", params: { animal } }),
      transformResponse: (response) => response.breeds,
    }),
    search: builder.query({
      query: ({ animal, location, breed }) => ({
        url: "pets",
        params: { animal, location, breed },
      }),
      transformResponse: (response) => response.pets,
    }),
  }),
});

// Finally createApi will create a hook for you to use in your app so we're going to export that.
export const { useGetPetQuery, useGetBreedsQuery, useSearchQuery } = petApi;
