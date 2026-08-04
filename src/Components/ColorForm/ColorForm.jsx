import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";
import addIcon from "../../assets/add-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import deleteIcon from "../../assets/delete-icon.svg";
import { useState } from "react";

export default function ColorForm({
  onAdd,
  themes,
  currentThemeId,
  handleSwitchTheme,
  handleAddTheme,
  handleRenameTheme,
  handleDeleteTheme,
  initialData = { role: "", hex: "#000000", contrastText: "#ffffff" },
  buttonLabel = "ADD COLOR",
}) {
  const [isEditingTheme, setIsEditingTheme] = useState(false);
  const [newThemeName, setNewThemeName] = useState("");
  const [isAddingTheme, setIsAddingTheme] = useState(false);
  const currentTheme = themes?.find((theme) => theme.id === currentThemeId);

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    onAdd(data);
  };
  return (
    <>
      <form onSubmit={onSubmit} className="color-form">
        <div>
          {themes && (
            <div className="theme_container">
              <label htmlFor="theme" className="color-form__labels">
                Theme
              </label>
              <select
                className="theme_selector"
                id="theme"
                name="theme"
                value={currentThemeId}
                onChange={(e) => handleSwitchTheme(e.target.value)}
              >
                {themes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
              </select>
              {isEditingTheme ? (
                <div className="theme-edit-container">
                  <input
                    type="text"
                    value={newThemeName}
                    onChange={(e) => setNewThemeName(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleRenameTheme(currentThemeId, newThemeName);
                      setIsEditingTheme(false);
                    }}
                  >
                    Update
                  </button>
                  <button type="button" onClick={() => setIsEditingTheme(false)}>
                    Cancel
                  </button>
                </div>
              ) : isAddingTheme ? (
                <div className="theme-add-container">
                  <input
                    type="text"
                    placeholder="New theme name"
                    value={newThemeName}
                    onChange={(e) => setNewThemeName(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleAddTheme(newThemeName);
                      setNewThemeName("");
                      setIsAddingTheme(false);
                    }}
                  >
                    Create
                  </button>
                  <button type="button" onClick={() => setIsAddingTheme(false)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="theme_buttons">
                  <button
                    className="icon-button"
                    type="button"
                    onClick={() => {
                      setNewThemeName("");
                      setIsAddingTheme(true);
                    }}
                  >
                    <img src={addIcon} alt="Add theme" />
                  </button>

                  <button
                    className="icon-button"
                    type="button"
                    disabled={currentTheme.id === "t1"}
                    onClick={() => {
                      setNewThemeName(currentTheme.name);
                      setIsEditingTheme(true);
                    }}
                  >
                    <img src={editIcon} alt="Edit theme" />
                  </button>
                  <button
                    className="icon-button"
                    type="button"
                    disabled={currentTheme.id === "t1"}
                    onClick={() => handleDeleteTheme(currentThemeId)}
                  >
                    <img src={deleteIcon} alt="Delete theme" />
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="color-form__field">
            <label htmlFor="role" className="color-form__labels">
              Role
            </label>
            <input type="text" name="role" id="role" defaultValue={initialData.role} />
          </div>
          <div className="color-form__field">
            <label htmlFor="hex" className="color-form__labels">
              HEX
            </label>
            <ColorInput
              id="hex"
              name="hex"
              defaultValue={initialData.hex}
              defaultColor={"#000000"}
            />
          </div>
          <div className="color-form__field">
            <label htmlFor="contrastText" className="color-form__labels">
              Contrast Text
            </label>
            <ColorInput
              id="contrastText"
              name="contrastText"
              defaultValue={initialData.contrastText}
              defaultColor={"#ffffff"}
            />
          </div>
          <div className="color-form__button-container">
            <button className="color-form__button-add" type="submit">
              {buttonLabel}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
