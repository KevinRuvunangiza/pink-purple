import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import LogoLoadingScreen from "./components/LoadingScreen";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Services from "./pages/Services"
// import Register from "./pages/Register";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NextSteps from "./components/NextSteps";


function App() {
  return (
    <Router>
      <LogoLoadingScreen duration={3500}>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />

          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/blog" element={<Blog />} />

          <Route path="/contact" element={<Contact />} />
           <Route path="/next-steps" element={<NextSteps />} />
        </Routes>
      </LogoLoadingScreen>
    </Router>
  );
}

export default App;