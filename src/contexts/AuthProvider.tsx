import { useState } from "react";
import type { AuthProviderProps } from "./AuthProviderProps";
import type UserLogin from "../models/UserLogin";
import { postRquest } from "../Services/Service";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }: AuthProviderProps) {
  const [userLogged, setUserLogged] = useState<UserLogin>({} as UserLogin);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  async function handleLogin(userLogin: UserLogin) {
    setIsLoading(true);

    try {
      await postRquest("/usuarios/logar", userLogin, setUserLogged);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro desconhecido");
      }
    }
    setIsLoading(false);
  }

  function handleLogout() {
    setUserLogged({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: "",
    });
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{ userLogged, error, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
