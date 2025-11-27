// src/components/admin/ProtectedRoute.tsx
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase, isUserAdmin } from "../../lib/supabase";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    // 1. Initial session hydration
    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;

      if (data.session) {
        const admin = await isUserAdmin();
        setIsAuthenticated(admin);
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false);
    });

    // 2. Listen for login/logout changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

        if (session) {
          const admin = await isUserAdmin();
          setIsAuthenticated(admin);
        } else {
          setIsAuthenticated(false);
        }

        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
}
