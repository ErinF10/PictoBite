import Api from "./services/api";
import Tracker from "./services/tracker";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Api />} />
        <Route path="/tracker" element={<Tracker />} />
      </Routes>
    </>
  );
}

export default App;
