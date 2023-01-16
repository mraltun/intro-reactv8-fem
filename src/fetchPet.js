const fetchPet = async ({ queryKey }) => {
  const id = queryKey[1];
  const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);

  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  // Any async function is going to return a promise anyway so we don't need to await it in the function body. You could await. It would do the same thing.
  return apiRes.json();
};

export default fetchPet;
