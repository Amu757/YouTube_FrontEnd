import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import React from "react";
import store from "./store/store.js";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Createpost from "./components/navigation/Createpost.jsx";
import Playlistpage from "./pages/Playlistpage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/video",
    element: <Createpost />,
  },
  {
    path: "/createpost",
    element: <Createpost/>,
  },
  {
    path: "/playlist",
    element: <Playlistpage/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
