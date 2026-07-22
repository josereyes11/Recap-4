import { useState } from "react";

export default function ColorInput({ id, name }) {
  const [formInput, setFormInput] = useState();

  return (
    <>
      <input
        id={`${id}-text`}
        name={`${name}`}
        type="text"
        value={formInput}
        onChange={(event) => {
          setFormInput(event.target.value);
        }}
      />
      <input
        id={`${id}-color`}
        name={`${name}`}
        type="color"
        value={formInput}
        onChange={(event) => {
          setFormInput(event.target.value);
        }}
      />
    </>
  );
}
