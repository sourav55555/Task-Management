import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './Layout/Main'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Home/Home';

// routes create 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children: [
    {
      path: "/",
      element: <Home/>
    }
  ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
