
import { createHashRouter, RouterProvider } from 'react-router-dom';

import './App.css'
import Navbar from './components/Navbar/Navbar'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import ProtectedRoutes from './components/protectedRoutes/protectedRoutes'
import ProtectedAuth from './components/ProtectedAuth/ProtectedAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { Toaster } from 'react-hot-toast'
import BrandDetails from './components/BrandDetails/BrandDetails'
import AllOrders from './components/AllOrders/AllOrders'
import Checkout from './components/Checkout/Checkout'
import Confirmation from './components/Confirmation/Confirmation'
import Wishlist from './components/Wishlist/Wishlist.jsx'
import { Offline } from 'react-detect-offline'

function App() {
  const queryClient = new QueryClient()

let routes = createHashRouter([
{ path:"", element: <Layout/>, children:[
  { index: true, element: <ProtectedRoutes><Home/></ProtectedRoutes>},
  { path:"products", element: <ProtectedRoutes><Products/></ProtectedRoutes>},
  { path:"brands", element: <ProtectedRoutes><Brands/></ProtectedRoutes>},
  { path: "cart", element: <ProtectedRoutes><Cart/></ProtectedRoutes>},
  { path:"cat", element: <ProtectedRoutes><Categories/></ProtectedRoutes>},
  { path:"login", element: <ProtectedAuth><Login/></ProtectedAuth>},
  { path:"register", element: <ProtectedAuth><Register/></ProtectedAuth>},
  { path:"allorders", element: <ProtectedRoutes><AllOrders/></ProtectedRoutes>},
  { path:"wishlist", element: <ProtectedRoutes><Wishlist/></ProtectedRoutes>},
  { path:"checkout", element: <ProtectedRoutes><Checkout/></ProtectedRoutes>},
  { path:"confirmation", element: <ProtectedRoutes><Confirmation/></ProtectedRoutes>},
  { path:"productdetails/:id/:category", element: <ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
  { path:"brandDetails/:id", element: <ProtectedRoutes><BrandDetails/></ProtectedRoutes>},
  { path:"*", element: <NotFound/>},
  
]}
  ]
)
  return (
    <>
    <QueryClientProvider client={queryClient}>
  <RouterProvider router={routes}></RouterProvider>
  <Toaster position ="top-right" reverseOrder={false}/>
  <ReactQueryDevtools initialIsOpen={false} />
  <Offline>
    <div className='text-white fixed bottom-1 left-1 bg-red-500 px-3 py-2 rounded-lg'>You are currently offline.</div>
  </Offline>
  </QueryClientProvider>
    </>
  )
}

export default App
