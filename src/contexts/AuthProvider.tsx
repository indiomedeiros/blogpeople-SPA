import { useState } from "react";
import type { AuthProviderProps } from "./AuthProviderProps";
import type UserLogin from "../models/UserLogin";
import { postRquest } from "../Services/Service";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUser] = useState<UserLogin>({} as UserLogin);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleLogin(userLogin: UserLogin) {
    setIsLoading(true);
    try {
      await postRquest("/usuarios/logar", userLogin, setUser);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  function handleLogout() {
    setUser({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: "",
    });
  }

  return (
    <AuthContext.Provider
      value={{ usuario, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
