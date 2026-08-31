import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color.jsx";
import "./App.css";
import ColorForm from "./Components/ColorForm/ColorForm.jsx";
import { nanoid } from "nanoid";
import useLocalStorageState from "use-local-storage-state";
import { initialThemes } from "./lib/themes.js";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";

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

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const currentTheme = themes.find((theme) => theme.id === currentThemeId);

  const currentThemeColors = currentTheme.colors.map((row) =>
    row.map((colorId) => themeColors.find((color) => color.id === colorId)),
  );

  function handleAddColor(themeColor) {
    const newColor = { ...themeColor, id: nanoid() };
    setThemeColors((prevColors) => [newColor, ...prevColors]);
    setThemes((prevThemes) =>
      prevThemes.map((theme) => {
        if (theme.id !== currentThemeId) return theme;
        if (theme.colors.length === 0) {
          return { ...theme, colors: [[newColor.id]] };
        }
        return {
          ...theme,
          colors: theme.colors.map((row, index) => (index === 0 ? [...row, newColor.id] : row)),
        };
      }),
    );
  }

  function handleDeleteColor(id) {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === currentThemeId
          ? {
              ...theme,
              colors: theme.colors
                .map((row) => row.filter((colorId) => colorId !== id))
                .filter((row) => row.length > 0),
            }
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

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setThemes((prevThemes) =>
      prevThemes.map((theme) => {
        if (theme.id !== currentThemeId) return theme;

        const rows = theme.colors.map((row) => [...row]);
        const activeRowIndex = rows.findIndex((row) => row.includes(active.id));
        const overRowIndex = rows.findIndex((row) => row.includes(over.id));
        if (activeRowIndex === -1 || overRowIndex === -1) return theme;

        const activeIndex = rows[activeRowIndex].indexOf(active.id);

        if (activeRowIndex === overRowIndex) {
          const overIndex = rows[activeRowIndex].indexOf(over.id);
          rows[activeRowIndex] = arrayMove(rows[activeRowIndex], activeIndex, overIndex);
        } else {
          rows[activeRowIndex].splice(activeIndex, 1);
          const overIndex = rows[overRowIndex].indexOf(over.id);
          rows[overRowIndex].splice(overIndex, 0, active.id);
        }

        return { ...theme, colors: rows.filter((row) => row.length > 0) };
      }),
    );
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
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="color-cards-container">
              {currentThemeColors.map((row, rowIndex) => (
                <SortableContext
                  key={rowIndex}
                  items={row.map((c) => c.id)}
                  strategy={horizontalListSortingStrategy}
                >
                  <div className="color-row">
                    {row.map((themeColor) => (
                      <Color
                        key={themeColor.id}
                        color={themeColor}
                        handleDeleteColor={handleDeleteColor}
                        handleEditColor={handleEditColor}
                      />
                    ))}
                  </div>
                </SortableContext>
              ))}
            </div>
          </DndContext>
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
