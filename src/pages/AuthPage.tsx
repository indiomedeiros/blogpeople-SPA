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
import bgAuth from "../assets/bg-auth.svg";
import submitIcon from "../assets/submitIcon.svg";
import emailIcon from "../assets/emailIcon.svg";
import passwordIcon from "../assets/passwordIcon.svg";

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
    <section className=" font-sans grid grid-cols-1 md:grid-cols-2  m-4 md:mx-8 md:my-21 shadow-2xl p-8 md:p-0 boder bg-white border-gray-50 rounded-xl gap-8 md:gap-0 xl:mx-auto xl:max-w-250 md:h-164 xl:h-156 xl:mt-">
      <div className="rounded-bl-2xl rounded-tl-2xl  md:flex md:flex-col hidden xl:py-15 md:p-12 xl:p-12  bg-blue-100 md:gap-4 xl:gap-6">
        <h2 className=" md:text-[2rem] font-bold xl:text-3xl">
          Transforme suas ideias em palavras.
        </h2>
        <p className="text-gray-600 md:text-[1.4rem] xl:text-lg">
          Junte-se a nossa comunidade de escritores e leitores apaixonados.
          Compartilhe sua jornada com o mundo.
        </p>
        <img
          className=" md:size-64 xl:size-80 xl:mx-auto  xl:w-xs "
          src={bgAuth}
          alt=""
        />
      </div>

      <div className="flex flex-col gap-6 md:p-12 md:w-full xl:py-15 bg-white ">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-[1.6rem]  font-bold">
            Bem-vindo de volta!
          </h2>
          <p className="text-gray-500 md:text-lg ">
            Entre na sua conta para continuar lendo e escrevendo
          </p>
        </div>

        <div className="flex gap-6 border-b border-gray-200 font-bold text-gray-500 text-sm md:text-shadow-md">
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
          className="flex flex-col text-gray-700 font-medium text-sm gap-6 xl:gap-4 w-full"
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
                className="border rounded border-gray-300 p-3.5 "
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

          <div className="flex flex-col  gap-2 ">
            <label htmlFor="email">E-mail</label>
            <div className=" flex flex-col relative">
              <input
                id="email"
                type="email"
                name="usuario"
                value={user.usuario}
                onChange={(e) => handleInputChange(e)}
                placeholder="        seu@email.com"
                className="border rounded border-gray-300 p-3.5"
                required
              />
              <img
                className="absolute left-4 top-3"
                src={emailIcon}
                alt="desenho de um cadeado"
              />
            </div>
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

            <div className="relative flex flex-col">
              <input
                id="passsowrd"
                type="password"
                name="senha"
                value={user.senha}
                onChange={(e) => handleInputChange(e)}
                placeholder="       ********"
                className="border rounded border-gray-300 p-3.5"
                required
              />
              <img
                className="absolute left-4  top-3"
                src={passwordIcon}
                alt="desenho de um cadeado"
              />
            </div>

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

          <button className=" flex justify-center gap-3 bg-blue-600 text-white rounded p-3.5 shadow-md shadow-gray-400">
            {isLoading || isLoadingSignup ? (
              <ClipLoader color="#ffffff" size={16} />
            ) : (
              "Entrar na plataforma"
            )}
            <img src={submitIcon} alt="" />
          </button>
        </form>
      </div>
    </section>
  );
}

export default AuthPage;
