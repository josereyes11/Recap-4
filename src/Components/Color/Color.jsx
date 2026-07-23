import "./Color.css";
import { useState } from "react";
import ColorForm from "../../ColorForm/ColorForm";
import deleteIcon from "../../assets/delete-icon.svg";
import editIcon from "../../assets/edit-icon.svg";

export default function Color({ color, handleDeleteColor, handleEditColor }) {
  const [isConfirming, setIsConfirming] = useState();
  const [isEditing, setIsEditing] = useState();
  return (
    <>
      <div className="color-card" style={{ color: color.contrastText, backgroundColor: color.hex }}>
        <p className="color-card-headline">{color.hex}</p>
        <p>{color.role}</p>
        <p>{color.contrastText}</p>
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
