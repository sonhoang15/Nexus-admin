import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";

import Dashboard from "@/pages/system/Dashboard";
import UsersPage from "@/pages/system/UsersPage";
import CategoriesPage from "@/pages/system/CategoriesPage";
import ProductsPage from "@/pages/system/ProductsPage";
import DocumentsPage from "@/pages/system/DocumentsPage";
import ContentPagesPage from "@/pages/system/ContentPages";
import SettingsPage from "@/pages/system/SettingsPage";
import AuthPage from "@/pages/auth/AuthPage";
import NotFound from "@/pages/system/NotFound";
import ProtectedRoute from "@/routes/ProtectedRoute";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/pages" element={<ContentPagesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
