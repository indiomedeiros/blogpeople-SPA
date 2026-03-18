import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import type UserLogin from "../models/UserLogin";
import { AuthContext } from "../contexts/AuthContext";
import { postRquest } from "../Services/Service";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function AuthPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("login");
  const { userLogged, handleLogin, isLoading, error } = useContext(AuthContext);
  const [isLoadingSignup, setIsLoadingSignup] = useState<boolean>(false);
  const [errorSignup, setErrorSignup] = useState<string>("");
  const [remenber, setRemenber] = useState<boolean>(false);
  const [user, setUser] = useState<UserLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  useEffect(() => {
    if (userLogged.token) {
      if (remenber) {
        localStorage.setItem("token", JSON.stringify(userLogged.token));
      }
      navigate("/");
    }
  }, [userLogged]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function sendDataForAuthorization(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (activeTab === "cadastro") {
      setIsLoadingSignup(true);
      try {
        await postRquest("/usuarios/cadastrar", user);
        setActiveTab("login");
      } catch (error) {
        if (error instanceof Error) {
          setErrorSignup(error.message);
        } else {
          setErrorSignup("Erro desconhecido");
        }
      }
      setIsLoadingSignup(false);
    } else if (activeTab === "login") {
      handleLogin(user);
    }
  }

  return (
    <section className="grid grid-cols-1 m-4 shadow-2xl p-8 boder bg-white border-gray-50 rounded-xl gap-6">
      <div>
        <h2 className="text-2xl font-bold">Bem-vindo de volta!</h2>
        <p className="text-gray-500">
          Entre na sua conta para continuar lendo e escrevendo
        </p>
      </div>

      <div className="flex gap-6 border-b border-gray-200 font-bold text-gray-500 text-sm">
        <button
          className={`pb-3 border-b-2 ${
            activeTab === "login"
              ? "border-blue-600 text-blue-600"
              : "border-transparent hover:text-blue-600 hover:border-blue-600"
          } transition duration-300`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>

        <button
          className={`pb-3 border-b-2 ${
            activeTab === "cadastro"
              ? "border-blue-600 text-blue-600"
              : "border-transparent hover:text-blue-600 hover:border-blue-600"
          } transition duration-300`}
          onClick={() => setActiveTab("cadastro")}
        >
          Cadastro
        </button>
      </div>

      <form
        onSubmit={sendDataForAuthorization}
        className="flex flex-col text-gray-700 font-medium text-sm gap-6"
      >
        {activeTab === "cadastro" && (
          <div className="flex flex-col  gap-2">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              name="nome"
              value={user.nome}
              onChange={(e) => handleInputChange(e)}
              placeholder="Digite o seu nome"
              className="border rounded border-gray-300 p-3.5"
              required
            />
          </div>
        )}

        {activeTab === "cadastro" && (
          <div className="flex flex-col  gap-2">
            <label htmlFor="foto">foto</label>
            <input
              id="foto"
              type="url"
              name="foto"
              value={user.foto}
              onChange={(e) => handleInputChange(e)}
              placeholder="https://foto.jpg"
              className="border rounded border-gray-300 p-3.5"
            />
          </div>
        )}

        <div className="flex flex-col  gap-2">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            name="usuario"
            value={user.usuario}
            onChange={(e) => handleInputChange(e)}
            placeholder="seu@email.com"
            className="border rounded border-gray-300 p-3.5"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <label htmlFor="password">Senha</label>
            {activeTab === "login" && (
              <a className="text-blue-600 " href="">
                Esqueci minha senha
              </a>
            )}
          </div>
          <input
            id="passsowrd"
            type="password"
            name="senha"
            value={user.senha}
            onChange={(e) => handleInputChange(e)}
            placeholder="********"
            className="border rounded border-gray-300 p-3.5"
            required
          />
          {error && activeTab === "login" && (
            <p className="text-red-600">Usuário ou senha inválidos.</p>
          )}
          {errorSignup && activeTab === "cadastro" && (
            <p className="text-red-600">Tente um outro e-mail.</p>
          )}
        </div>

        {activeTab === "login" && (
          <div className="flex gap-2 ">
            <input
              id="remenber"
              type="checkbox"
              onChange={(e) => setRemenber(e.target.checked)}
              className="accent-blue-700"
            />
            <label htmlFor="remenber">Lembrar de min</label>
          </div>
        )}

        <button className="bg-blue-600 text-white rounded p-3.5 shadow-md shadow-gray-400">
          {isLoading || isLoadingSignup ? (
            <ClipLoader color="#ffffff" size={16} />
          ) : (
            "Entrar na plataforma"
          )}
        </button>
      </form>
    </section>
  );
}

export default AuthPage;
