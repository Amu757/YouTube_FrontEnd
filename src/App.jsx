import { useState, useEffect } from "react";
import {useDispatch} from "react-redux"
import "./App.css";
import Loader from "./components/Loader/Loder";

import { useNavigate } from "react-router-dom";

import { login as storelogin } from "./store/authSlice";
import Homepage from "./components/Homepage";
function App() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasLogin, setHasLogin] = useState(null);
  const getlogin = async (token) => {
    let order = {
      type: "getlogin",
    };
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/loginbytoken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(order),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log("error in login", error);
        navigate("/login");
        return;
      }

      const responsedata = await response.json();

      localStorage.setItem("accessToken", responsedata.data.accessToken);
      const user_info = responsedata.data.user;
      if (user_info){
        dispatch(storelogin(user_info));
        setHasLogin(true)
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    }finally{
      setLoading(false)
    }
  };
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    if (token) {
      getlogin(token);
    }else{
      navigate("/login")
      setLoading(false);
    }
  }, [navigate]);

  return loading ? <Loader /> : <Homepage hasLogin={hasLogin} />;

}

export default App;
