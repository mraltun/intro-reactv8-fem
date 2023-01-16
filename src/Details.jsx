import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";

const Details = () => {
  const { id } = useParams();
  // When a query needs more information to describe the data, we can use an array with a string and any objects to describe (we use details and id number array as query key). fetchPet is query function. It will run if the data haven't cached yet
  const results = useQuery(["details", id], fetchPet);

  // The results object has a lot of booleans on it for isLoading, isError, isFetching, isPaused, etc. In this case react-query will make it start its first fetch (but not finish) and then continue rendering. Therefore we must handle the isLoading case (in addition to that just being a good idea)
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </div>
    </div>
  );
};

export default Details;
