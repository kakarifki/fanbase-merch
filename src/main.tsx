// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import About from './pages/about';
// import Faq from './pages/faq';
// import ErrorPage from "./pages/error-page";
// import TaskDetail from './pages/task-detail';
// import NewTask from './pages/new-task';
// import { TaskProvider } from './context/task-context';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
// import UserDashboard from './components/UserDashboard';
import ProductList from './components/productlist';
import { Toaster } from './components/ui/toaster';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      // {
      //   path: "/dashboard",
      //   element: <UserDashboard />,
      // },
      {
        path: "/product",
        element: <ProductList />,
      },
      // {
      //   path: "/about",
      //   element: <About />,
      // },
      // {
      //   path: "/faq",
      //   element: <Faq />,
      // },
      // {
      //   path: "/task/:id",
      //   element: <TaskDetail />,
      // },
      // {
      //   path: "/new-task",
      //   element: <NewTask />,
      // },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <TaskProvider> */}
        <RouterProvider router={router} />
        <Toaster />
    {/* </TaskProvider> */}
  </React.StrictMode>
);
