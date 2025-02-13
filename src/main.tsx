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
import { authLoader } from "./lib/auth-loader"; //  Gunakan authLoader dari file terpisah
import CheckoutSuccess from './components/CheckOut';
import OrderPage from './components/OrderPage';
import OrderDetailPage from './components/OrderDetailPage';

// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, 
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/product",
        element: <ProductList />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: authLoader, // 
      },
      {
        path: "/cart",
        element: <CartPage />,
        loader: authLoader, //
      },
      {
        path: "/checkout-success",
        element: <CheckoutSuccess />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {

      path: "/orders", 
        element: <OrderPage />,
        loader: authLoader,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetailPage />,
        loader: authLoader,
      },
      
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
