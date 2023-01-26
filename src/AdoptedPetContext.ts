// createContext is a function that returns an object with two React components in it: a Provider and a Consumer. A Provider is how you scope where a context goes. A context will only be available inside of the Provider. You only need to do this once.
// A Consumer is how you consume from the above provider. A Consumer accepts a function as a child and gives it the context which you can use. We won't be using the Consumer directly: a function called useContext will do that for us.
// The object provided to context is the default state it uses when it can find no Provider above it, useful if there's a chance no provider will be there and for testing. It's also useful for TypeScript because TypeScript will enforce these types
import { createContext } from "react";
import { Pet } from "./APIResponsesTypes";

const AdoptedPetContext = createContext<
  [Pet | null, (adoptedPet: Pet) => void]
>([
  {
    id: 1337,
    name: "Fido",
    animal: "dog",
    description: "Lorem ipsum",
    breed: "Beagle",
    images: [],
    city: "Seattle",
    state: "WA",
  },
  () => {},
]);

export default AdoptedPetContext;
