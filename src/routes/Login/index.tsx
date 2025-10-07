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
    (async () => {
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
    })();
  };

  return (
    <main className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Coluna Esquerda: Login */}
      <div className="w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            <span className="text-pink-600">SEU</span>LOGO
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
            Para continuar, faça login no <span className="font-bold">SEULOGO</span>
          </p>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div>
              <label htmlFor="nomeUsuario" className="sr-only">
                Usuário
              </label>
              <input
                id="nomeUsuario"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="Usuário"
                {...register("nomeUsuario", {
                  required: "Informe o usuário.",
                  minLength: { value: 3, message: "Mínimo de 3 caracteres." },
                })}
                aria-invalid={!!errors.nomeUsuario || undefined}
              />
              {errors.nomeUsuario && (
                <small className="text-red-500 mt-1 block">
                  {errors.nomeUsuario.message}
                </small>
              )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                placeholder="Email"
                {...register("email", {
                  required: "Informe o email.",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email inválido.",
                  },
                })}
                aria-invalid={!!errors.email || undefined}
              />
              {errors.email && (
                <small className="text-red-500 mt-1 block">
                  {errors.email.message}
                </small>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-pink-600 hover:text-pink-500"
                >
                  Esqueceu a senha?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Coluna Direita: Cadastro */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-gradient-to-r from-pink-500 to-red-600 text-white text-center">
        <h2 className="text-4xl font-extrabold mb-4">Novo por aqui?</h2>
        <p className="text-xl mb-8">Cadastre-se grátis e comece a curtir</p>
        <button
          onClick={() => navigate("/cadastro")}
          className="py-3 px-8 border-2 border-white text-white font-bold rounded-md hover:bg-white hover:text-pink-600 transition duration-300 ease-in-out"
        >
          CADASTRAR-SE
        </button>
      </div>
    </main>
  );
}