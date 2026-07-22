import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { useState } from "react";
import ColorForm from "./ColorForm/ColorForm.jsx";
import ColorInput from "./ColorInput/ColorInput.jsx";

function App() {
  const [themeColors, setThemeColors] = useState(initialColors);

  function handleAddColor(themeColor) {
    setThemeColors((prevColors) => [themeColor, ...prevColors]);
  }

  function handleDeleteColor(id) {
    setThemeColors((prevColors) => prevColors.filter((color) => color.id !== id));
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onAdd={handleAddColor} />
      <div>
        {themeColors.map((themeColor) => {
          return (
            <Color
              key={themeColor.id}
              color={themeColor}
              handleDeleteColor={handleDeleteColor}
            ></Color>
          );
        })}
      </div>
    </>
  );
}

export default App;
