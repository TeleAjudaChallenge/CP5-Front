import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { TipoUsuario } from "../../types/tipoUsuario";
const API_URL = import.meta.env.VITE_API_URL_BASE;

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TipoUsuario>();

  const onSubmit = async ({ nomeUsuario, email }: TipoUsuario) => {
    try {
      const response = await fetch(
        `${API_URL}/usuarios?nomeUsuario=${nomeUsuario}&email=${email}`
      );
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const user = data[0];
        sessionStorage.setItem(
          "auth:user",
          JSON.stringify({
            id: user.id,
            nomeUsuario: user.nomeUsuario,
            email: user.email,
          })
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
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-4xl flex rounded-xl shadow-2xl overflow-hidden">
        {/* Coluna Esquerda: Formulário */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 bg-white dark:bg-gray-800">
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Bem-vindo de volta!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Faça login para continuar.
            </p>
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div>
                <label
                  htmlFor="nomeUsuario"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Usuário
                </label>
                <input
                  id="nomeUsuario"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Seu nome de usuário"
                  {...register("nomeUsuario", {
                    required: "O nome de usuário é obrigatório.",
                    minLength: { value: 3, message: "Mínimo de 3 caracteres." },
                  })}
                />
                {errors.nomeUsuario && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.nomeUsuario.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-end">
                <a
                  href="#"
                  className="text-sm font-medium text-pink-600 hover:text-pink-500"
                >
                  Esqueceu a senha?
                </a>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50"
                >
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Coluna Direita: Convite para Cadastro */}
        <div className="hidden md:flex w-1/2 flex-col items-center justify-center p-12 bg-gradient-to-r from-pink-500 to-red-500 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">Novo por aqui?</h2>
          <p className="text-lg mb-8">
            Crie sua conta agora mesmo e junte-se a nós. É rápido e fácil!
          </p>
          <button
            onClick={() => navigate("/cadastro")}
            className="py-3 px-8 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-pink-600 transition-transform transform hover:scale-105 duration-300"
          >
            CADASTRAR-SE
          </button>
        </div>
      </div>
    </div>
  );
}