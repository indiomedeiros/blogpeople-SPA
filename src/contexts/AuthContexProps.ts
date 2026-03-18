import type UserLogin from "../models/UserLogin";

export interface AuthContextProps {
  userLogged: UserLogin;
  error?: string;
  handleLogout(): void;
  handleLogin(usuario: UserLogin): Promise<void>;
  isLoading: boolean;
}
