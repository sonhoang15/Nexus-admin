import { createContext, useEffect, useState } from "react";
import { loginService } from "@/services/auth.Service";
import { storage } from "@/utils/storageHelper";
import { IAuthData } from "@/types/auth";
import { logoutService } from "@/services/auth.Service";
import { getMeService } from "@/services/auth.Service";

interface LoginResult {
  message: string;
}

export interface UserContextType {
  auth: IAuthData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginContext: (email: string, password: string) => Promise<LoginResult>;
  logoutContext: () => void;
  refreshUser: () => void;
}

const AUTH_STORAGE_KEY = "auth";

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<IAuthData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedAuth = storage.get<IAuthData>(AUTH_STORAGE_KEY);

      if (!storedAuth?.accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await getMeService();

        setAuth({
          ...storedAuth,
          user: res.data,
        });
      } catch (error) {
        storage.remove(AUTH_STORAGE_KEY);
        setAuth(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);
  const loginContext = async (email: string, password: string) => {
    const res = await loginService({ email, password });

    if (res.success) {
      const authData = res.data;
      storage.set(AUTH_STORAGE_KEY, authData);
      setAuth(authData);
      await refreshUser();

      return {
        message: "Login success",
      };
    }

    return { message: "Login failed" };
  };
  const logoutContext = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      storage.remove(AUTH_STORAGE_KEY);
      setAuth(null);
    }
  };

  const refreshUser = async () => {
    try {
      const res = await getMeService();

      setAuth((prev) =>
        prev
          ? {
              ...prev,
              user: res.data,
            }
          : null,
      );
    } catch {
      setAuth(null);
    }
  };

  return (
    <UserContext.Provider
      value={{
        auth,
        isAuthenticated: !!auth?.accessToken,
        isLoading,
        loginContext,
        logoutContext,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
