import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import LogoLoadingScreen from "./components/LoadingScreen";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NextSteps from "./pages/NextSteps";
import { LoginPage } from "./pages/admin/LoginPage";
import { AdminLayout } from "./components/admin/AdminLayout";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { ActivityLogsPage } from "./pages/admin/ActivityLogsPage";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { PaymentsPage } from "./pages/admin/PaymentsPage";
import { SubmissionsPage } from "./pages/admin/SubmissionsPage";
import { BlogManagePage } from "./pages/admin/BlogManagePage";

function App() {
  return (
    <Router>
      <LogoLoadingScreen duration={3500}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/next-steps" element={<NextSteps />} />
          {/* Public route */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="blog" element={<BlogManagePage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="submissions" element={<SubmissionsPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="activity" element={<ActivityLogsPage />} />
          </Route>
        </Routes>
      </LogoLoadingScreen>
    </Router>
  );
}

export default App;
