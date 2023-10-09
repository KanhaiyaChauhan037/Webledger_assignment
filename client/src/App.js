import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Profile from "./pages/Profile";
import Authentication from "./pages/Authentication";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:id" element={<RecipeDetails />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/authentication" element={<Authentication />}></Route>
      </Routes>
    </>
  );
}

export default App;
