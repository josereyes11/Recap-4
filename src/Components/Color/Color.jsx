import "./Color.css";
import { useState } from "react";

export default function Color({ color, handleDeleteColor }) {
  const [isConfirming, setIsConfirming] = useState();
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
      </div>
    </>
  );
}
