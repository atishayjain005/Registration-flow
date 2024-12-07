import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./styles/global.css";
import MultiStepForm from "./pages/MultiStepForm/MultiStepForm";

function App() {
  const [count, setCount] = useState(0);

  return <MultiStepForm />;
}

export default App;
