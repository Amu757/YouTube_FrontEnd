import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux";
import React from "react";
import store from "./store/store.js"
import App from "./App.jsx";
import Homepage from "./components/Homepage.jsx";
import Contact from "./pages/Contact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    Children: [
      {
        path: "/",
        element: <Homepage />,
      },
      // {
      //   path: "/login",
      //   element: <Login/>,
      // },
      // {
      //   path: "/signup",
      //   element: <Signup/>,
      // },
      // {
      //   path: "/all-videos",
      //   element: <AllVideos/>,
      // },
      // {
      //   path: "/add-video",
      //   element: <AddVideo/>,
      // },
      // {
      //   path: "/video/:vid_id",
      //   element: <Video/>,
      // },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
