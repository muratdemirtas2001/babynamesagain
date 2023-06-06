import "./App.css";

import HomePage from "./HomePage";
import BabyNamesApp from "./BabyNamesApp";
import { Routes, Route } from "react-router-dom";
import Profile from "./Profile";
function App() {
  console.log("hello from APP");
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="babynamesapp" element={<BabyNamesApp />}></Route>
      <Route path="profile" element={<Profile />}></Route>
    </Routes>
  );
}

export default App;
