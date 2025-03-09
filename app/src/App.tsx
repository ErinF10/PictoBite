import Api from "./services/api";
import Tracker from "./services/tracker";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import PersonalizedNutrition from "./services/PersonalizedNutrition";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Api />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/nutrition" element={<PersonalizedNutrition />} />
      </Routes>
    </>
  );
}

export default App;
