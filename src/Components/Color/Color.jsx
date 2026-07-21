import "./Color.css";

export default function Color({ color }) {
  return (
    <>
      <div className="color-card" style={{ color: color.contrastText, backgroundColor: color.hex }}>
        <p className="color-card-headline">role={color.role}</p>
        hex={color.hex}
      </div>
    </>
  );
}
