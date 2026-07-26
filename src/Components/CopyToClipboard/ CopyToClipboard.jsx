import { useState, useEffect } from "react";
import copyIcon from "../../assets/copy-icon.svg";
import "./CopyToClipboard.css";

export default function CopyToClipboard({ hexColorCopied }) {
  const [isCopied, setIsCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(hexColorCopied);
      setIsCopied(true);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [isCopied]);

  return (
    <div>
      {isCopied ? (
        <button className="button-copied" onClick={() => setIsCopied(true)}>
          Copied!
        </button>
      ) : (
        <button className="icon-button" onClick={() => handleCopy()}>
          <img src={copyIcon} alt="Copy" />
        </button>
      )}
    </div>
  );
}
