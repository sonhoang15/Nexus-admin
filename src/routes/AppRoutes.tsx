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

import { ERoutePath } from "@/enums/route.enums";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ERoutePath.AUTH} element={<AuthPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path={ERoutePath.DASHBOARD} element={<Dashboard />} />
          <Route path={ERoutePath.USERS} element={<UsersPage />} />
          <Route path={ERoutePath.CATEGORIES} element={<CategoriesPage />} />
          <Route path={ERoutePath.PRODUCTS} element={<ProductsPage />} />
          <Route path={ERoutePath.DOCUMENTS} element={<DocumentsPage />} />
          <Route path={ERoutePath.PAGES} element={<ContentPagesPage />} />
          <Route path={ERoutePath.SETTINGS} element={<SettingsPage />} />
          <Route path={ERoutePath.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
