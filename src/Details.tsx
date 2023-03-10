import { useState, useContext, lazy } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { adopt } from "./adoptedPetSlice";
import AdoptedPetContext from "./AdoptedPetContext";
import { useGetPetQuery } from "./petApiService";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";

const Modal = lazy(() => import("./Modal"));

const Details = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  if (!id) {
    throw new Error("No ID!");
  }
  const { isLoading, data: pet } = useGetPetQuery(id);
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

  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results?.data?.pets[0];
  if (!pet) {
    throw new Error("No Pet!");
  }

  return (
    <div className="details">
      <Carousel images={pet.images} />;
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {/* Notice that despite we're rendering a whole different part of the DOM we're still referencing the state in Details.jsx. This is the magic of Portals. You can use state but render in different parts of the DOM. Imagine a sidebar with contextual navigation. Or a contextual footer. It opens up a lot of cool possibilities. React Router has some cool features built into that take advantage of this as well. */}
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    // setAdoptedPet(pet);
                    // You use dispatch functions to dispatch an action (which adopt does for us). That payload will eventually be passed to the reducer we made which will update our store. Redux handles all of the informing React of when to re-render
                    dispatch(adopt(pet));
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

// We catch the error, if no error we just render Details. We either need to type props or get rid of them.TypeScript requires you to be explicit all the time.
export default function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}
