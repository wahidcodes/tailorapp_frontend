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
import AddOrder from './comps/AddOrder.tsx';
import ViewOrders from './comps/ViewOrders.tsx';
import EmailCustomer from './comps/EmailCustomer.tsx';
import SendSMS from './comps/SendSMS.tsx';
import UpdateOrder from './comps/UpdateOrder.tsx';
import ViewEmails from './comps/ViewEmails.tsx';
import ViewSMS from './comps/ViewSMS.tsx';
import AddMeas from './comps/AddMeas.tsx';
import PrintInvoice from './comps/PrintInvoice.tsx';

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
      {
        path: '/addorder',
        element: <AddOrder />
      },
      {
        path: '/addorder/:idParam',
        element: <AddOrder />
      },
      {
        path: '/vieworders',
        element: <ViewOrders/> 
      },
      {
        path: '/updateorder/:idParam',
        element: <UpdateOrder/> 
      },
      {
        path: '/email/:idParam',
        element: <EmailCustomer />
      },
      {
        path: '/sendsms/:idParam',
        element: <SendSMS />
      },
      {
        path: '/viewemails',
        element: <ViewEmails />
      },
      {
        path: '/viewsms',
        element: <ViewSMS />
      },
      {
        path: '/addmeas/:idParam',
        element: <AddMeas />
      },
      {
        path: '/printinvoice/:idParam',
        element: <PrintInvoice />
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
