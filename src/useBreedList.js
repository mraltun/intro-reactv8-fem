// This is after react query
import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

export default function useBreedList(animal) {
  const results = useQuery(["breeds", animal], fetchBreedList);

  return [results?.data?.breeds ?? [], results.status];
}

// We're returning two things back to the consumer of this custom hook: a list of breeds (including an empty list when it doesn't have anything in it) and an enumerated type of the status of the hook: unloaded, loading, or loaded. We won't be using the enum today but this is how I'd design it later if I wanted to throw up a nice loading graphic while breeds were being loaded.
// We're tossing in localCache so if it loads once, it won't have to reload the same API call in the same session. You could take this further by sticking it in local storage or we could be more intelligent about ETags.
// import { useState, useEffect } from "react";

// const localCache = {};

// export default function useBreedList(animal) {
//   const [breedList, setBreedList] = useState([]);
//   const [status, setStatus] = useState("unloaded");

//   useEffect(() => {
//     if (!animal) {
//       setBreedList([]);
//     } else if (localCache[animal]) {
//       setBreedList(localCache[animal]);
//     } else {
//       requestBreedList();
//     }

//     async function requestBreedList() {
//       setBreedList([]);
//       setStatus("loading");
//       const res = await fetch(
//         `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
//       );
//       const json = await res.json();
//       localCache[animal] = json.breeds || [];
//       setBreedList(localCache[animal]);
//       setStatus("loaded");
//     }
//   }, [animal]);

//   return [breedList, status];
// }
