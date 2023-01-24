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
import AdoptedPetContext from "./AdoptedPetContext";
import Results from "./Results";
import useBreedList from "./useBreedList";
import fetchSearch from "./fetchSearch";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [isPending, startTransition] = useTransition();

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

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
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
              setAnimal(e.target.value);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value);
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
