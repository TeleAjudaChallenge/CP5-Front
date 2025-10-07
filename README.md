# CP5-Front: Sistema de Autenticação

Este projeto foi desenvolvido como parte do Checkpoint 5, com o objetivo de criar uma aplicação front-end completa para autenticação de usuários, incluindo funcionalidades de login e cadastro.

A aplicação foi construída utilizando **Vite + React com TypeScript** e estilizada com **Tailwind CSS**. Para simular o back-end e o banco de dados, utilizamos o **`json-server`**.

## Funcionalidades Implementadas

O projeto atende a todos os requisitos solicitados, incluindo:

-   **Estrutura Moderna:** Projeto criado com Vite, React e TypeScript para uma base de código robusta e escalável.
-   **Sistema de Roteamento:** Implementação de rotas para `/login` e `/cadastro` utilizando `react-router-dom`.
-   **Validação de Formulários:** Uso da biblioteca `react-hook-form` para validar os campos de entrada em ambos os formulários, fornecendo feedback instantâneo ao usuário.
-   **Lógica de Cadastro Segura:** Antes de criar um novo usuário, o sistema verifica se o `nomeUsuario` ou `email` já existem no banco de dados para evitar duplicidade.
-   **Autenticação Simples:** O login é validado contra a API e, em caso de sucesso, as informações do usuário são salvas na `sessionStorage` para simular uma sessão ativa.
-   **Exibição de Dados do Usuário:** Após o login, o nome e o email do usuário são exibidos no cabeçalho das páginas protegidas.
-   **Estilização Profissional:** Toda a interface foi estilizada utilizando o framework de design utilitário **Tailwind CSS**.

## Como Executar o Projeto

Para rodar este projeto localmente, você precisará de dois terminais abertos.

**1. Iniciar a API (json-server):**

No primeiro terminal, execute o comando abaixo para iniciar o servidor que simula o banco de dados.

npm run api

O json-server começará a rodar na porta http://localhost:3002.

**2. Iniciar a Aplicação Front-end:**

No segundo terminal, execute o comando para iniciar a aplicação React.

npm run dev

A aplicação estará disponível em http://localhost:5173 (ou em outra porta, se a 5173 estiver em uso).

**Integrantes do Grupo**

Nome Completo	RM
Julia Correa e Souza Altino 564870
Matheus Borges Sansão	562896
Nicholas Camillo Canadas de Paula 561262
