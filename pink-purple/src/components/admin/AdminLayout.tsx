// src/components/admin/AdminLayout.tsx - Mobile Optimized
import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  History,
  LogOut,
  Menu,
  X,
  BookOpen,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import MainLogo from "../../assets/Pink & Purple Logo Package/Main logo without background.png";

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const navItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/submissions", label: "Submissions", icon: FileText },
  { path: "/admin/payments", label: "Payments", icon: CreditCard },
  { path: "/admin/activity", label: "Activity Logs", icon: History },
  { path: "/admin/blog", label: "Blog Posts", icon: BookOpen }, // Add this line
];


  const isActive = (path: string) => location.pathname === path;

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <img src={MainLogo} alt="Main Logo" />
            <button
              onClick={closeSidebar}
              className="lg:hidden text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 hover:text-gray-700 lg:hidden"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-xs sm:text-sm text-gray-600 font-medium">
              Admin Dashboard
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
}
