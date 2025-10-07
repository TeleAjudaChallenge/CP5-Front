import { Outlet, useLocation } from "react-router-dom";
import Cabecalho from "./components/Cabecalho/Cabecalho";
import Rodape from "./components/Rodape/Rodape";

export default function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/cadastro";
  
  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <div className="container">
      <Cabecalho />
      <main className="main">
        <Outlet />
      </main>
      <Rodape />
    </div>
  );
}