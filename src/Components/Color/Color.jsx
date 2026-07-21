import "./Color.css";

export default function Color({ color }) {
  return (
    <>
      <div className="color-card" style={{ color: color.contrastText, backgroundColor: color.hex }}>
        <p className="color-card-headline">{color.hex}</p>
        <p>{color.role}</p>
        <p>{color.contrastText}</p>
      </div>
    </>
  );
}
