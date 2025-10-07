import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import "./globals.css";

import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Login from './routes/Login/index.tsx';
import Cadastro from './routes/Cadastro/index.tsx';
import Error from './routes/Error/index.tsx';

const router = createBrowserRouter([
  {path:"/", element:<App/>, errorElement:<Error/> , children:[
    {path:"/",element:<Login/>},
    {path:"/cadastro",element:<Cadastro/>},
  ]}
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
