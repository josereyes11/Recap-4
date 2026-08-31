import "./Color.css";
import { useState, useEffect } from "react";
import ColorForm from "../ColorForm/ColorForm.jsx";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard.jsx";
import { fetchContrast } from "../../lib/contrast.js";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Color({ color, handleDeleteColor, handleEditColor }) {
  const [isConfirming, setIsConfirming] = useState();
  const [isEditing, setIsEditing] = useState();
  const [dataRatio, setRatioData] = useState({
    ratio: "",
    AA: "",
    AALarge: "",
    AAA: "",
    AAALarge: "",
  });

  useEffect(() => {
    async function run() {
      const data = await fetchContrast(color.contrastText, color.hex);
      setRatioData(data);
    }
    run();
  }, [color.hex, color.contrastText]);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: color.id,
  });
  const dragStyle = { transform: CSS.Transform.toString(transform), transition };

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="color-card"
        style={{ ...dragStyle, color: color.contrastText, backgroundColor: color.hex }}
      >
        <div className="hex-and-copy-container">
          <p className="color-card-headline">{color.hex}</p>
          <CopyToClipboard hexColorCopied={color.hex} />
        </div>
        <div className="role-and-hex-contrast">
          <p>{color.role}</p>
        </div>

        <div className="contrast-checker-container">
          <p style={{ fontSize: "14px" }}>
            Normal text:{" "}
            {dataRatio.AAA === "pass" ? "AAA ✓" : dataRatio.AA === "pass" ? "AA ✓" : "Fail ✗"}
          </p>
          <p style={{ fontSize: "20px" }}>
            Large text:{" "}
            {dataRatio.AAALarge === "pass"
              ? "AAA ✓"
              : dataRatio.AALarge === "pass"
                ? "AA ✓"
                : "Fail ✗"}
          </p>
          <p>{color.contrastText}</p>
        </div>
        <div className="card-icon-buttons">
          {isConfirming ? (
            <div className="color-card-question-container">
              <p className="color-card-question">Are you sure?</p>
              <button onClick={() => handleDeleteColor(color.id)}>Yes</button>
              <button onClick={() => setIsConfirming(false)}>Cancel</button>
            </div>
          ) : (
            <button className="icon-button" onClick={() => setIsConfirming(true)}>
              <img src={deleteIcon} alt="Delete" />
            </button>
          )}
          {isEditing ? (
            <div className="isEditing-container">
              <div className="color-card-cancel-container">
                <button className="color-card-cancel-button" onClick={() => setIsEditing(false)}>
                  CANCEL
                </button>
              </div>
              <ColorForm
                buttonLabel="UPDATE COLOR"
                initialData={color}
                onAdd={(data) => {
                  handleEditColor(color.id, data);
                  setIsEditing(false);
                }}
              />
            </div>
          ) : (
            <button className="icon-button" onClick={() => setIsEditing(true)}>
              <img src={editIcon} alt="Edit" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
