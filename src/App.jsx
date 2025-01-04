
import './App.css'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
// import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Brands from './components/Brands/Brands';
import { UserContextProvider } from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductsDetails from './components/ProductsDetails/ProductsDetails';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext';
import  { Toaster } from 'react-hot-toast';

function App() {
  const queryClient = new QueryClient()

  const router = createBrowserRouter([
    {path: "" , element: <Layout /> ,children: [
        {index: true  , element: <ProtectedRoute><Home /></ProtectedRoute> },
        {path :"categories" , element:<ProtectedRoute><Categories /></ProtectedRoute> },
        {path :"brands" , element:<ProtectedRoute> <Brands /></ProtectedRoute>},
        {path :"cart" , element:<ProtectedRoute><Cart /></ProtectedRoute> },
        {path :"products" , element: <ProtectedRoute><Products/></ProtectedRoute> },
        {path :"productsdetails/:id" , element: <ProtectedRoute><ProductsDetails /></ProtectedRoute> },
        {path :"login" , element:<Login />  }, 
        {path :"register" , element:<Register /> },
        {path :"*" , element:  <Login />},

      ],
    },
  ]);


  return <CartContextProvider>
  <QueryClientProvider client={queryClient}>
  <UserContextProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
      
      <ReactQueryDevtools/>   {/* ReactQuery */}
  </UserContextProvider> 
  </QueryClientProvider>
  </CartContextProvider>
}

export default App
