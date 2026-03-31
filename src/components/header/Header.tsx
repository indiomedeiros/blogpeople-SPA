import logo from "../../assets/logoIcon.svg";

function Header() {
  return (
    <header className="flex gap-2 p-4 md:px-10 md:py-3 md:w-full mx-auto md:h-14 md:items-center xl:w-7xl xl:items-center xl:px-10">
      <img src={logo} alt="logomarca é um contorno de livro aberto" />
      <h1 className="font-bold">Blog Pessoal</h1>
    </header>
  );
}

export default Header;
