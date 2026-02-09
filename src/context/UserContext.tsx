import { createContext, useEffect, useState } from "react";
import { loginApi } from "@/services/AuthService";
import { storage } from "@/utils/storageHelper";
import { IAuthData, TLoginResponse } from "@/types/auth";

interface LoginResult {
  message: string;
}

export interface UserContextType {
  auth: IAuthData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginContext: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
}

const AUTH_STORAGE_KEY = "auth";

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<IAuthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAuth = storage.get<IAuthData>(AUTH_STORAGE_KEY);

    if (storedAuth?.accessToken) {
      setAuth(storedAuth);
    }

    setIsLoading(false);
  }, []);

  const loginContext = async (
    email: string,
    password: string,
  ): Promise<LoginResult> => {
    const res: TLoginResponse = await loginApi({ email, password });

    const authData = res.data;

    storage.set(AUTH_STORAGE_KEY, authData);
    setAuth(authData);

    return {
      message: res.message,
    };
  };

  const logout = () => {
    storage.remove(AUTH_STORAGE_KEY);
    setAuth(null);
  };

  return (
    <UserContext.Provider
      value={{
        auth,
        isAuthenticated: !!auth?.accessToken,
        isLoading,
        loginContext,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
