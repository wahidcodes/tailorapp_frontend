import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AdminUser from './comps/AdminUser.tsx';
import Login from './comps/Login.tsx';
import { AuthContextProvider } from './context/AuthContext.tsx';
import DashBoard from './comps/DashBoard.tsx';
import ChangePassword from './comps/ChangePassword.tsx';
import DashBoardMain from './comps/DashBoardMain.tsx';
import AddCustomer from './comps/AddCustomer.tsx';
import ViewCustomer from './comps/ViewCustomer.tsx';

const user = localStorage.getItem('user'); // unable to use ternary operators with users
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login/>
  },  
  {
    path: "/",
    element: <DashBoard />,
    children: [
      {
        path: '/dashboard',
        element: <DashBoardMain />
      },
      {
        path: '/addcustomer',
        element: <AddCustomer /> 
      },
      {
        path: '/changepassword',
        element: <ChangePassword /> 
      },
      {
        path: '/viewcustomer',
        element: <ViewCustomer /> 
      },
          
    ]
  },
  {
    path: '/admin',
    element: <AdminUser />
  },  

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
)
