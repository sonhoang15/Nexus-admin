import { useState, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/libs/utils";
import {
  LayoutDashboard,
  Users,
  Layers,
  Package,
  FileText,
  FileCode,
  Settings,
  Menu,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Outlet } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { logoutApi } from "@/services/AuthService";

const navigation = [
  { name: "Overview", href: "/", icon: LayoutDashboard },
  { name: "User Management", href: "/users", icon: Users },
  { name: "Category Management", href: "/categories", icon: Layers },
  { name: "Product Management", href: "/products", icon: Package },
  { name: "Document Management", href: "/documents", icon: FileText },
  { name: "Content Pages", href: "/pages", icon: FileCode },
  { name: "Settings", href: "/settings", icon: Settings },
];

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

export function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex w-full">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-64",
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
          <div
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            className={cn(
              "flex items-center gap-3 cursor-pointer select-none transition-all",
              sidebarCollapsed ? "mx-auto" : "",
            )}
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                N
              </span>
            </div>

            {!sidebarCollapsed && (
              <span className="font-semibold text-foreground whitespace-nowrap">
                Nexus Admin
              </span>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
          <ul className="space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!sidebarCollapsed && <span>{item.name}</span>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 bg-gray-200 hover:bg-black text-black"
              >
                <span className="text-sm font-medium hidden sm:block">
                  Super Admin
                </span>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    A
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <h1 className="text-sm font-medium text-black uppercase text-center">
                Account
              </h1>
              <h1 className="text-xs text-muted-foreground text-center">
                {useUser().auth?.user.email || "N/A"}
              </h1>
              <DropdownMenuItem className="hover:!bg-black text-black">
                <Users className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:!bg-black text-black">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive hover:!bg-red-500 text-red-500"
                onClick={() => logoutApi()}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
