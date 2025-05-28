import "./App.css";

import MouseFollower from "./components/MouseFollower";
import Navbar from "./components/Navbar";

import LocomotiveScroll from "locomotive-scroll";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Pricing from "./Pages/Pricing";
import Footer from "./components/Footer";
import ServerLess from "./Pages/ServerLess";
import Hosting from "./Pages/Hosting";
import Docs from "./Pages/Docs";
import Blog from "./Pages/Blog";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";

function App() {
  const locomotiveScroll = new LocomotiveScroll();

  return (
    <>
      <BrowserRouter>
        <MouseFollower />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/hyperrcompute/pricing" element={<Pricing />} />
          <Route path="/hyperrcompute/serverless" element={<ServerLess />} />
          <Route path="/hyperrcompute/hosting" element={<Hosting />} />
          <Route path="/hyperrcompute/docs" element={<Docs />} />
          <Route path="/hyperrcompute/blogs" element={<Blog />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
