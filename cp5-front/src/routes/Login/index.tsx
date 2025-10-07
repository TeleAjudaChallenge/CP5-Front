import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { TipoUsuario } from "../../types/tipoUsuario";
const API_URL = import.meta.env.VITE_API_URL_BASE;

export default function Login() {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Login";
  }, []);

  const {register, handleSubmit, formState: { errors, isSubmitting },} = useForm<TipoUsuario>();

  const onSubmit = async ({nomeUsuario, email}: TipoUsuario) => {
  try {
    const response = await fetch(
      `${API_URL}/usuarios?nomeUsuario=${nomeUsuario}&email=${email}`
    );

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
        const user = data[0];
        sessionStorage.setItem(
          "auth:user",
          JSON.stringify({ id: user.id, nomeUsuario: user.nomeUsuario, email: user.email })
        );
        alert("Login realizado com sucesso!");
        navigate("/");
      } else {
        alert("Usuário ou e-mail incorretos!");
      }
    } catch (e) {
      console.error(e);
      alert("Erro ao conectar à API.");
    }
};

return (
    <main>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset className="frmEditarProduto">
          <legend>Faça seu login!</legend>

          <div>
            <label htmlFor="nomeUsuario">Usuário:</label>
            <input
              id="nomeUsuario"
              type="text"
              placeholder="Digite seu usuário"
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
              placeholder="Digite seu email"
              {...register("email", {
                required: "Informe o email.",
                pattern: { value: /\S+@\S+\.\S+/, message: "Email inválido." },
              })}
              aria-invalid={!!errors.email || undefined}
            />
            {errors.email && <small>{errors.email.message}</small>}
          </div>

          <div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );

}
