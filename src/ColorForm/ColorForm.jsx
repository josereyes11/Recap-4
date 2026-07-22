import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";

export default function ColorForm({ onAdd }) {
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    onAdd(data);
  };
  return (
    <>
      <form onSubmit={onSubmit} className="color-form">
        <div className="color-form__fields">
          <div className="color-form__field">
            <label htmlFor="role">Role</label>
            <input type="text" name="role" id="role" />
          </div>
          <div className="color-form__field">
            <label htmlFor="hex">HEX</label>
            <ColorInput id="hex" name="hex" />
          </div>
          <div className="color-form__field">
            <label htmlFor="contrastText">Contrast Text</label>
            <ColorInput id="contrastText" name="contrastText" />
          </div>
          <div className="color-form__button-container">
            <button class="color-form__button-add" buttontype="submit">
              ADD COLOR
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
