import { QueryFunction } from "@tanstack/react-query";
import { PetAPIResponse } from "./APIResponsesTypes";

// The return type to be a PetAPIResponse. Also our fetchPet is only used with the 'details' key and that the second part of the query key is a string (otherwise it could be unknown)
const fetchPet: QueryFunction<PetAPIResponse, ["details", string]> = async ({
  queryKey,
}) => {
  // ["details", id] from Details
  const id = queryKey[1];
  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  // Any async function is going to return a promise anyway so we don't need to await it in the function body. You could await. It would do the same thing.
  return apiRes.json();
};

export default fetchPet;
