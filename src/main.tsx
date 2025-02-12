import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProductList from './components/productlist';
import { Toaster } from './components/ui/toaster';
import Profile from './components/Profile';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import HomePage from './components/home';
import ProductDetailPage from './components/ProductDetailPage';
import CartPage from './components/CartPage';
import AboutPage from './components/AboutPage';

// Create a client
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />, belom dibikin
    children: [
      {
        index: true, 
        element: <HomePage />, // Render HomePage di route utama
      },
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
      {
        path: "/product/:id", // Route product details
        element: <ProductDetailPage />,
     },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/cart", // Route Cart
        element: <CartPage />,
      },
      {
        path: "/about", // about page
        element: <AboutPage />,
      },
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
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster />
        </QueryClientProvider>
  </React.StrictMode>
);
