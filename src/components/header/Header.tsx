import logo from "../../assets/logoIcon.svg";

function Header() {
  return (
    <header className="flex gap-2 p-4  lg:mx-auto lg:w-7xl">
      <img src={logo} alt="logomarca é um contorno de livro aberto" />
      <h1 className="font-bold">Blog Pessoal</h1>
    </header>
  );
}

export default Header;
