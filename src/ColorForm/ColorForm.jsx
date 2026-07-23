import ColorInput from "../ColorInput/ColorInput";
import "./ColorForm.css";

export default function ColorForm({
  onAdd,
  initialData = { role: "", hex: "#000000", contrastText: "#ffffff" },
  buttonLabel = "ADD COLOR",
}) {
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
