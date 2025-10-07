import Menu from "../Menu/Menu";
import { useNavigate } from "react-router-dom";

export default function Cabecalho() {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("auth:user") || "null");

  function handleLogout() {
    sessionStorage.removeItem("auth:user");
    navigate("/");
  }

  return (
    <header>
      <h1>Meu App</h1>
      <Menu />
      {user ? (
        <div>
          <span>{user.nomeUsuario}</span> • <span>{user.email}</span>{" "}
          <button onClick={handleLogout}>Sair</button>
        </div>
      ) : (
        <div>Faça login</div>
      )}
    </header>
  );
}
