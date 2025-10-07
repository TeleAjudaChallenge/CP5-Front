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

  const {register, handleSubmit, formState: { errors, isSubmitting }, reset,} = useForm<TipoUsuario>();



 const onSubmit = async ({nome, nomeUsuario, email}: TipoUsuario) => {
    try{
      const checkResp = await fetch(`${API_URL}/usuarios?nomeUsuario=${encodeURIComponent(nomeUsuario)}&email=${encodeURIComponent(email)}`);
      const existentes = await checkResp.json();
      if (Array.isArray(existentes) && existentes.length > 0) {
        alert("Já existe um usuário com esse nome de usuário e e-mail.");
        return;
      }

      const createResp = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, nomeUsuario, email }),
      });

      if (!createResp.ok) {
        alert("Não foi possível concluir o cadastro.");
        return;
      }

      alert("Cadastro realizado com sucesso!");
      reset();
      navigate("/");
    }catch(e){
      alert("Erro ao conectar à API.");
    }    
  



 }
    
  return (
    <main>
      <h1>CADASTRE-SE</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset>
          <legend>Faça seu cadastro!</legend>

          <div>
            <label htmlFor="nome">Nome:</label>
            <input
              id="nome"
              type="text"
              placeholder="Digite aqui seu nome"
              {...register("nome", {
                required: "Informe o nome.",
                minLength: { value: 2, message: "Mínimo de 2 caracteres." },
              })}
              aria-invalid={!!errors.nome || undefined}
            />
            {errors.nome && <small>{errors.nome.message}</small>}
          </div>

          <div>
            <label htmlFor="nomeUsuario">Usuário:</label>
            <input
              id="nomeUsuario"
              type="text"
              placeholder="Digite aqui seu usuário"
              {...register("nomeUsuario", {
                required: "Informe o usuário.",
                minLength: { value: 3, message: "Mínimo de 3 caracteres." },
              })}
              aria-invalid={!!errors.nomeUsuario || undefined}
            />
            {errors.nomeUsuario && <small>{errors.nomeUsuario.message}</small>}
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Digite aqui seu email"
              {...register("email", {
                required: "Informe o email.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email inválido.",
                },
              })}
              aria-invalid={!!errors.email || undefined}
            />
            {errors.email && <small>{errors.email.message}</small>}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
        </fieldset>
      </form>
    </main>
  );
}
