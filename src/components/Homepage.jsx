import Feed from "./feed/Feed";
import Navigation from "./navigation/Navigation";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loder";
import "./style.css";
import { useEffect, useState } from "react";

function Homepage({hasLogin}) {
  const [loading, setLoading] = useState(true);
  const isLoggedin = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  useEffect(() => {
    if (hasLogin === null) {
      return; // Wait until we know the login status
    }

    if (!isLoggedin) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [hasLogin, isLoggedin, navigate]);
  return (
    <div className="homepage">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navigation />
          <Feed />
        </>
      )}
    </div>
  );
}

export default Homepage;
