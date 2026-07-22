import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { useState } from "react";
import ColorForm from "./ColorForm/ColorForm.jsx";
import ColorInput from "./ColorInput/ColorInput.jsx";
import { nanoid } from "nanoid";

function App() {
  const [themeColors, setThemeColors] = useState(initialColors);

  function handleAddColor(themeColor) {
    const newColor = { ...themeColor, id: nanoid() };
    setThemeColors((prevColors) => [newColor, ...prevColors]);
  }

  function handleDeleteColor(id) {
    setThemeColors((prevColors) => prevColors.filter((color) => color.id !== id));
  }

  function handleEditColor(id, newColorData) {
    setThemeColors((prevColors) =>
      prevColors.map((color) => (color.id === id ? { ...color, ...newColorData } : color)),
    );
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <div className="app-layout">
        <ColorForm onAdd={handleAddColor} />
        {themeColors.length ? (
          <div className="color-cards-container">
            {themeColors.map((themeColor) => {
              return (
                <Color
                  key={themeColor.id}
                  color={themeColor}
                  handleDeleteColor={handleDeleteColor}
                  handleEditColor={handleEditColor}
                ></Color>
              );
            })}
          </div>
        ) : (
          <div className="message-of-emptiness-container">
            <p className="message-of-emptiness">Your color theme is empty, add new colors!</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
