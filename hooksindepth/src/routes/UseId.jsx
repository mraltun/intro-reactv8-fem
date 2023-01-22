// A new hook for version 18 of React is useId. Frequently in React you need unique identifiers to associate two objects together. An example of this would be making sure a label and an input are associated together by the htmlFor attribute.
import { useId } from "react";

function LabelInputPair() {
  // If you need multiple IDs in the same component just do {id}-name, {id}-address, ``{id}-number, etc. No need to call useId` multiple times.
  const id = useId();
  return (
    <div style={{ marginBottom: "50px" }}>
      <label htmlFor={id}>
        Click on this label and it will highlight the input {id}
      </label>
      <br />
      <input type="text" id={id} placeholder={`input id ${id}`} />
    </div>
  );
}

export default function UseIdComponent() {
  return (
    <>
      <LabelInputPair />
      <LabelInputPair />
      <LabelInputPair />
      <LabelInputPair />
    </>
  );
}
