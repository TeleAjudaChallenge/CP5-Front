import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { TipoUsuario } from "../../types/tipoUsuario";
const API_URL = import.meta.env.VITE_API_URL_BASE;

export default function Cadastro() {
  
  useEffect(() => {
    document.title = "Cadastro";
  }, []);

  const navigate = useNavigate();

   const {register,handleSubmit} = useForm<TipoUsuario>();



 const onSubmit = async (data: TipoUsuario) => {
        (
          async () => {
             await fetch(`${API_URL}/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data)
             });
             alert("Produto editado com sucesso!");
             navigate("/produtos");
          })();

 }
    
  return (
    <main>
      <h1>CADASTRE-SE</h1>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="frmEditarProduto">
            <legend>Faça seu cadastro!</legend>
            <div>
              <label htmlFor="nome">Nome:</label>
              <input type="text" id="nome" placeholder="Digite aqui seu nome" {...register("nome")}/>
            </div>
            <div>
              <label htmlFor="nomeUsuario">Usuario:</label>
              <input type="text" id="nomeUsuario" placeholder="Digite aqui seu usuario" {...register("nomeUsuario")}/>
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="text" id="email" placeholder="Digite aqui seu email" {...register("email")}/>
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
