import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { useState } from "react";
import Loader from "../Loader/Loder";
import Resetpass from "../../pages/Resetpass";
import { changeNav } from "../../store/authSlice";

import "./feed.css";
function ApiOption({ apiName, Icon, setShowMenu }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [activeOption, setActiveOption] = useState(null);

  const getLogout = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log("error in login", error);
        alert(error.message);
        return;
      }

      const responsedata = await response.json();

      localStorage.setItem("accessToken", responsedata.data.accessToken);
      console.log("successful logout: ");
      dispatch(logout());
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setShowMenu(false);
    switch (apiName) {
      case "Sign out":
        getLogout();
        break;
      case "Reset password":
        if (!confirm("Do you really want to change your password")) return;
        setActiveOption("resetpass");
        break;
      case "Update account":
        dispatch(changeNav(apiName));
        break;
      case "Update avatar":
        dispatch(changeNav(apiName));
        break;
      case "Update coverImage":
        dispatch(changeNav(apiName));
        break;
      default:
        console.log("nothing triggered");
        break;
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : activeOption === "resetpass" ? (
        <div className="resetpass">
          <Resetpass setActiveOption={setActiveOption} />
        </div>
      ) : (
        <div className="api-container" onClick={() => handleClick()}>
          <div className="icon">
            <Icon />
          </div>
          <div className="item">{apiName}</div>
        </div>
      )}
    </>
  );
}

export default ApiOption;
