import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color.jsx";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm.jsx";
import { nanoid } from "nanoid";
import useLocalStorageState from "use-local-storage-state";
import { initialThemes } from "./lib/themes.js";

function App() {
  const [themeColors, setThemeColors] = useLocalStorageState("flatPool", {
    defaultValue: initialColors,
  });

  const [themes, setThemes] = useLocalStorageState("themesKey", {
    defaultValue: initialThemes,
  });

  const [currentThemeId, setCurrentThemeId] = useLocalStorageState("currentThemeIdKey", {
    defaultValue: initialThemes[0].id,
  });

  const currentTheme = themes.find((theme) => theme.id === currentThemeId);

  const currentThemeColors = currentTheme.colors.map((colorId) =>
    themeColors.find((color) => color.id === colorId),
  );

  function handleAddColor(themeColor) {
    const newColor = { ...themeColor, id: nanoid() };
    setThemeColors((prevColors) => [newColor, ...prevColors]);
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === currentThemeId ? { ...theme, colors: [...theme.colors, newColor.id] } : theme,
      ),
    );
  }

  function handleDeleteColor(id) {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === currentThemeId
          ? { ...theme, colors: theme.colors.filter((colorId) => colorId !== id) }
          : theme,
      ),
    );
  }

  function handleEditColor(id, newColorData) {
    setThemeColors((prevColors) =>
      prevColors.map((color) => (color.id === id ? { ...color, ...newColorData } : color)),
    );
  }

  function handleSwitchTheme(themeId) {
    setCurrentThemeId(themeId);
  }

  function handleAddTheme(name) {
    if (!name || !name.trim()) return;
    const newTheme = { id: nanoid(), name, colors: [] };
    setThemes((prevThemes) => [...prevThemes, newTheme]);
    setCurrentThemeId(newTheme.id);
  }

  function handleRenameTheme(themeId, newName) {
    if (themeId === "t1") return;
    setThemes((prevThemes) =>
      prevThemes.map((theme) => (theme.id === themeId ? { ...theme, name: newName } : theme)),
    );
  }

  function handleDeleteTheme(themeId) {
    if (themeId === "t1") return;
    setThemes((prevThemes) => prevThemes.filter((theme) => theme.id !== themeId));
    if (currentThemeId === themeId) {
      setCurrentThemeId("t1");
    }
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <div className="app-layout">
        <ColorForm
          onAdd={handleAddColor}
          themes={themes}
          currentThemeId={currentThemeId}
          handleSwitchTheme={handleSwitchTheme}
          handleAddTheme={handleAddTheme}
          handleRenameTheme={handleRenameTheme}
          handleDeleteTheme={handleDeleteTheme}
        />
        {currentThemeColors.length ? (
          <div className="color-cards-container">
            {currentThemeColors.map((themeColor) => {
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
