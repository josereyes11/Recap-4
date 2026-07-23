import "./Color.css";
import { useState } from "react";
import ColorForm from "../../ColorForm/ColorForm";

export default function Color({ color, handleDeleteColor, handleEditColor }) {
  const [isConfirming, setIsConfirming] = useState();
  const [isEditing, setIsEditing] = useState();
  return (
    <>
      <div className="color-card" style={{ color: color.contrastText, backgroundColor: color.hex }}>
        <p className="color-card-headline">{color.hex}</p>
        <p>{color.role}</p>
        <p>{color.contrastText}</p>
        {isConfirming ? (
          <div>
            <p className="color-card-question">Are you sure?</p>
            <button onClick={() => handleDeleteColor(color.id)}>Yes</button>
            <button onClick={() => setIsConfirming(false)}>Cancel</button>
          </div>
        ) : (
          <button onClick={() => setIsConfirming(true)}>DELETE</button>
        )}
        {isEditing ? (
          <div>
            <div className="color-card-cancel-container">
              <button className="color-card-cancel-button" onClick={() => setIsEditing(false)}>
                Cancel
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
          <button onClick={() => setIsEditing(true)}>EDIT</button>
        )}
      </div>
    </>
  );
}
