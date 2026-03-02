import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { EPath } from "@/enums/path.enums";

const ProtectedRoute = () => {
  const ctx = useContext(UserContext);

  if (!ctx) return null;

  const { isAuthenticated, isLoading } = ctx;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={EPath.AUTH} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
