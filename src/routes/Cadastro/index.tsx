import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { TipoUsuario } from "../../types/tipoUsuario";
const API_URL = import.meta.env.VITE_API_URL_BASE;

export default function Cadastro() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cadastro";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TipoUsuario>();

  const onSubmit = async ({ nome, nomeUsuario, email }: TipoUsuario) => {
    try {
      const checkResp = await fetch(
        `${API_URL}/usuarios?nomeUsuario=${nomeUsuario}&email=${email}`
      );
      const existentes = await checkResp.json();
      if (Array.isArray(existentes) && existentes.length > 0) {
        alert("Já existe um usuário com esse nome de usuário ou e-mail.");
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
    } catch (e) {
      alert("Erro ao conectar à API.");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl flex rounded-xl shadow-2xl overflow-hidden">
        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-[#1A1D29]">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2">
              Crie sua conta
            </h2>
            <p className="text-[#B1B2B5] mb-8">
              É rápido e fácil, vamos começar.
            </p>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Nome Completo
                </label>
                <input
                  id="nome"
                  type="text"
                  className="w-full px-3 py-2 border bg-gray-700 border-gray-600 rounded-md shadow-sm text-white placeholder-[#B1B2B5] focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                  placeholder="Seu nome completo"
                  {...register("nome", {
                    required: "O nome é obrigatório.",
                    minLength: { value: 2, message: "Mínimo de 2 caracteres." },
                  })}
                />
                {errors.nome && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.nome.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="nomeUsuario"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Usuário
                </label>
                <input
                  id="nomeUsuario"
                  type="text"
                  className="w-full px-3 py-2 border bg-gray-700 border-gray-600 rounded-md shadow-sm text-white placeholder-[#B1B2B5] focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                  placeholder="Crie um nome de usuário"
                  {...register("nomeUsuario", {
                    required: "O nome de usuário é obrigatório.",
                    minLength: { value: 3, message: "Mínimo de 3 caracteres." },
                  })}
                />
                {errors.nomeUsuario && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.nomeUsuario.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 border bg-gray-700 border-gray-600 rounded-md shadow-sm text-white placeholder-[#B1B2B5] focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
                  placeholder="voce@exemplo.com"
                  {...register("email", {
                    required: "O email é obrigatório.",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Formato de email inválido.",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#1A1D29] bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white disabled:opacity-50"
                >
                  {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden md:flex w-1/2 flex-col items-center justify-center p-12 bg-white text-center">
          <h2 className="text-4xl font-bold text-[#1A1D29] mb-4">
            Já tem uma conta?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Faça login agora mesmo para acessar sua conta.
          </p>
          <button
            onClick={() => navigate("/")}
            className="py-3 px-8 border-2 border-[#1A1D29] text-[#1A1D29] font-bold rounded-full hover:bg-[#1A1D29] hover:text-white transition-all duration-300"
          >
            FAZER LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}