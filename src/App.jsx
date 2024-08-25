// import { useState, useEffect } from "react";
// import {useDispatch} from "react-redux"
// import {login,logout} from "./store/authSlice"

// import Homepage from "./components/Homepage";
// import Loader from "./components/Loader/Loder";
import Contact from "./pages/Contact";

function App() {
  // const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   .getCurrentUser()
  //   .then((data) => {
  //     if (data) {
  //       dispatch(login({ data }));
  //     } else {
  //       dispatch(logout());
  //     }
  //   })
  //   .finally(() => setLoading(false));
  // }, []);

  // return !loading ? <Homepage /> : <Loader />;
  // return <Homepage />;
  return <Contact />;
}

export default App;
