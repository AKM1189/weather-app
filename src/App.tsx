import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./home-components/layout";
import "./App.css";
import Home from "./home-components/home";
import Cities from "./home-components/cities";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home/>}/>
        <Route path="/cities" element={<Cities/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
