import "./App.css";
import LogoLoadingScreen from "./components/LoadingScreen";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <LogoLoadingScreen duration={3500}>
        <NavBar />
        <LandingPage />
      </LogoLoadingScreen>
    
    </>
  );
}

export default App;
