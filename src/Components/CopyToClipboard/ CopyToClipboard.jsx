import { useState, useEffect } from "react";
import copyIcon from "../../assets/copy-icon.svg";

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
    <div className="copy-container">
      {isCopied ? (
        <button onClick={() => setIsCopied(true)}>Copied!</button>
      ) : (
        <button className="icon-button" onClick={() => handleCopy()}>
          <img src={copyIcon} alt="Copy" />
        </button>
      )}
    </div>
  );
}

/* <div className="copy-container">
  {isCopied ? (
    <button className="icon-button" onClick={() => setIsCopied(true)}>
      <img src={copyIcon} alt="Copy" />
    </button>
  ) : (
    <button onClick={() => handleCopy()}>Copied!</button>
  )}
</div>;
 */
