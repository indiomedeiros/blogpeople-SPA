import type UserLogin from "../models/UserLogin";

export interface AuthContextProps {
  usuario: UserLogin;
  handleLogout(): void;
  handleLogin(usuario: UserLogin): Promise<void>;
  isLoading: boolean;
}
