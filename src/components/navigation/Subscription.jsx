import Option from "./Option";
import { SiCoinmarketcap } from "react-icons/si";
import { IoIosArrowDropdown } from "react-icons/io";
import Loader from "../Loader/Loder";
import { useSelector } from "react-redux";
import "./nav.css";
import { useEffect, useState } from "react";
function Subscription() {
  const [subscribedChanels, setSubscribedChanels] = useState([]);
  const [loading, setLoading] = useState(false);
  const subscriberId = useSelector((state) => state.auth.data?._id);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(
          `http://localhost:8000/api/v1/subscription/u/${subscriberId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const error = await response.json();
          console.log("error feching subscribers", error);
          alert("error feching subscribers");
          return;
        }

        const responsedata = await response.json();
        setSubscribedChanels(responsedata.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <section className="navsection sub">
        <div className="title">
          <h4>Subscriptions</h4>
        </div>
        {loading ? (
          <Loader />
        ) : ( subscribedChanels && subscribedChanels.length !==0 ? subscribedChanels.map((entity)=> <Option key={entity._id} Icon={SiCoinmarketcap} item={entity.channel} />):
          <>
            <p>No subscriptions</p>
            <Option Icon={IoIosArrowDropdown} navName="Show More" />
          </>
        )}
        <hr className="rular" />
      </section>
    </>
  );
}

export default Subscription;
