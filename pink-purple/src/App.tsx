import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import LogoLoadingScreen from "./components/LoadingScreen";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NextSteps from "./pages/NextSteps";

function App() {
  return (
    <Router>
      <LogoLoadingScreen duration={3500}>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/next-steps" element={<NextSteps />} />
        </Routes>
      </LogoLoadingScreen>
    </Router>
  );
}

export default App;