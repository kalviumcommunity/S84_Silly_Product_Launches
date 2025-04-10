import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import { Navbar } from "./Components/Navbar";
import Explore from "./Pages/Explore";
import AddProduct from "./Pages/AddProduct";
import Auth from "./Components/Auth";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/new-product" element={<AddProduct />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
