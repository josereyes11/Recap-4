import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";

function App() {
  return (
    <>
      <h1>Theme Creator</h1>
      <div>
        {initialColors.map((themeColor) => {
          return <Color key={themeColor.id} color={themeColor}></Color>;
        })}
      </div>
    </>
  );
}

export default App;
