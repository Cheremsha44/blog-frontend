import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../components/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";
import Post from "../pages/Post";
import Profile from "../pages/Profile";
import EditPost from "../pages/EditPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Registration",
        element: <Registration />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "post/:id",
        element: <Post />,
      },
      {
        path: "post/:id/edit",
        element: <EditPost />,
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
