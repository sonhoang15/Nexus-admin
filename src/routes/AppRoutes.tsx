import { Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";

import Dashboard from "@/pages/system/Dashbroard/Dashboard";
import UsersPage from "@/pages/system/UsersPage/UsersPage";
import CategoriesPage from "@/pages/system/CategoryPage/CategoriesPage";
import ProductsPage from "@/pages/system/ProductPage/ProductsPage";
import DocumentsPage from "@/pages/system/DocumentPage/DocumentsPage";
import ContentPagesPage from "@/pages/system/ContentPage/ContentPages";
import SettingsPage from "@/pages/system/SettingPage/SettingsPage";
import AuthPage from "@/pages/authPage/AuthPage";
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
