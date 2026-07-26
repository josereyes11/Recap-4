import { useState } from "react";

export default function ColorInput({ id, name, defaultValue, defaultColor }) {
  const [formInput, setFormInput] = useState(defaultValue);
  const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(formInput);

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
        value={isValidHex ? formInput : defaultColor}
        onChange={(event) => {
          setFormInput(event.target.value);
        }}
      />
    </>
  );
}
