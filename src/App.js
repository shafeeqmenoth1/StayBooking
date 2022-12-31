import React from "react"
import {
  createBrowserRouter,
  RouterProvider,
 
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "hotels",
    element: <List/>,
  },
  {
    path: "hotels/:id",
    element: <Hotel/>,
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "register",
    element: <Register/>,
  }
]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
