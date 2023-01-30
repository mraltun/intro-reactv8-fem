// The idea behind transitions is some of your renders are low priority: if they need to be interrupted they can be. What you don't want is to interrupt user intent: if a user clicks on a thing then you want drop everything to make sure that click felt responsive. useDeferredValue going to accomplish exactly this.
// A good way to keep useTransition straight versus useDeferredValue and when to use either. For useTransition, you are telling React "hey, I have a new thing to give you but it's low priority". It's proactive. You are starting that process explicitly with the startTransition function. useDeferredValue is more reactive. It's saying to React "hey, when you get a new value here, it's low priority so you can take your time."
import {
  useContext,
  useDeferredValue,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { Animal } from "./APIResponsesTypes";
import { all } from "./searchParamsSlice";
import { useSearchQuery } from "./petApiService";
import AdoptedPetContext from "./AdoptedPetContext";
import Results from "./Results";
import useBreedList from "./useBreedList";
import fetchSearch from "./fetchSearch";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  // const [requestParams, setRequestParams] = useState({
  //   location: "",
  //   animal: "" as Animal,
  //   breed: "",
  // });
  const results = useQuery(["search", searchParams], fetchSearch);
  const [animal, setAnimal] = useState("" as Animal);
  const [breeds] = useBreedList(animal);
  const [isPending, startTransition] = useTransition();
  // const [adoptedPet] = useContext(AdoptedPetContext);
  // You give useSelector a function that takes in the entire state tree and gives back just what you need. Keep in mind this is a subscription function: it will use this function to judge whether or not it needs to re-render your component. So don't just give it state => state or else it'll re-render on every state change ever which is likely not what you want.
  const dispatch = useDispatch();
  const adoptedPet = useSelector((state) => state.adoptedPet.value);
  const searchParams = useSelector((state) => state.searchParams.value);

  // useEffect(() => {
  //   requestPets();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // async function requestPets() {
  //   const res = await fetch(
  //     `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  //   );
  //   const json = await res.json();

  //   setPets(json.pets);
  // }

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  // useDeferredValue takes in a value and gives you a cached version of it: that cached version may be current or it may a stale one as it works through a re-render. Evenutally it will be the current one
  const deferredPets = useDeferredValue(pets);
  // We then need to use that cached version. So we use useMemo to make a version of the component that can be used and won't change until the deferredPets value changes (otherwise it'll just re-render every time anyway)
  const renderedPets = useMemo(
    () => <Results pets={deferredPets} />,
    [deferredPets]
  );

  // RTK
  const { data: pets } = useSearchQuery(searchParams);
  pets = pets ?? [];

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          // Wwitch from e.target to e.currentTarget because while target works it's not technically guaranteed to be on a submit event even though it always is.
          const formData = new FormData(e.currentTarget);
          const obj = {
            // Working with the DOM with TypeScript can get annoying because there's a lot of legacy pseudo types that we never had to care about. Technically formData.get gives us back a FormDataEntryValue type and not a string but when you use it like we were it implicitly called toString. Now we have to do it explictly.
            animal:
              (formData.get("animal")?.toString() as Animal) ?? ("" as Animal),
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
          };
          dispatch(all(obj));
          // Low priority state. Defer showing a loading state until everything else is done in the name of keeping the UI responsive
          startTransition(() => {
            setRequestParams(obj);
          });
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            name="location"
            className="w-60 mb-5 block"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            id="animal"
            className="w-60 mb-5 block"
            value={animal}
            onChange={(e) => {
              // We need to type values as they come out of the DOM. There's no way for TypeScript to understand what goes into the DOM and what comes back out so we have to be explicit as it goes in and out.
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            className="w-60 mb-5 block disabled:opacity-50"
            disabled={!breeds.length}
            name="breed"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        {isPending ? (
          <div className="mini loading-page">
            <h2 className="loader">🐩</h2>
          </div>
        ) : (
          <button className="rounded px-6 py-2 text-white hover:opacity-50 border-none bg-orange-500">
            Submit
          </button>
        )}
      </form>
      {/* <Results pets={pets} /> */}
      {renderedPets}
    </div>
  );
};

export default SearchParams;
