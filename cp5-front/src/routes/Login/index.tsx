import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { TipoUsuario } from "../../types/tipoUsuario";
const API_URL = import.meta.env.VITE_API_URL_BASE;

export default function Login() {

    const [nomeUsuario, setUsuario] = useState("")
    const [email, setEmail] = useState("")
  
  useEffect(() => {
    document.title = "Editar Produtos";
  }, []);

  const navigate = useNavigate();

   const {register,handleSubmit} = useForm<TipoUsuario>();



 const onSubmit = async (data: TipoUsuario) => {
    // Aqui você pode fazer uma requisição para atualizar os dados do produto.

        (
          async () => {
             await fetch(`${API_URL}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({nomeUsuario, email})
             });
             alert("Produto editado com sucesso!");
             navigate("/produtos");
          })();

 }
    
  return (
    <main>
      <h1>LOGIN</h1>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="frmEditarProduto">
            <legend>Faça seu login!</legend>
            <div>
              <label htmlFor="nomeUsuario">Usuario:</label>
              <input type="text" id="nomeUsuario" placeholder="Digite aqui seu usuario" value = {nomeUsuario} onChange={(e) => setUsuario(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" placeholder="Digite aqui seu email" value = {email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
              <button type="submit">Entrar</button>
            </div>
          </fieldset>
        </form>
      </div>

    </main>
  );
}
