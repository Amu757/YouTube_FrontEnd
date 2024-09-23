import PostItem from "./PostItem";
import Loader from "../Loader/Loder";
import Updateuser from "../../pages/Updateuser";
import UpdateAvatar from "../../pages/UpdateAvatar";
import UpdateCover from "../../pages/UpdateCover";
import { toggleProMenu } from "../../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./feed.css";
import Fullscreen from "../videoscreen/Fullscreen";

export const UnderDev = () => {
  return (
    <div className="devbox">
      <h2>Page is under Development</h2>
    </div>
  );
};

function Footer() {
  const [loading, setLoading] = useState(false);
  const Loggedin = useSelector((state) => state.auth.status);
  const activeNav = useSelector((state) => state.auth.activeNav);
  const video_info = useSelector((state) => state.auth.videoInfo);
  // const userid = useSelector((state) => state.auth.data?._id);
  // const [allShorts, setAllShorts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [subscribedPosts, setSubscribedPosts] = useState([]);
  const dispatch = useDispatch();

  const getvideos = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/video/getallvideos?page=1&limit=10&query=0&sortBy=createdAt&sortType=1",
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
        console.log("error fetching videos ", error);
        alert(error.message);
        return;
      }

      const data = await response.json();

      console.log("get video info ", data.data);

      setAllPosts(data.data.allVideos);
      setAllUsers(data.data.usersInfo);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubVid = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/video/getSubscribedVideos?page=1&limit=10&query=0&sortBy=createdAt&sortType=1`,
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
        console.log("error fetching subscribed videos ", error);
        alert(error.message);
        return;
      }

      const videos = await response.json();
      setSubscribedPosts(videos.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!activeNav) return;
      console.log("activeNav is ", activeNav);
      switch (activeNav) {
        case "Home":
          await getvideos();
          break;
        case "shorts":
          // ();
          break;
        case "subVid":
          await getSubVid();
          break;
        default:
          console.log("null");
          break;
      }
      setLoading(false);
    };
    if (activeNav) fetchData();
  }, [activeNav, Loggedin]);

  const compareDate = (date) => {
    const givenDate = new Date(date);
    const currentDate = new Date();

    const diffInMilliSec = currentDate - givenDate;
    const diffInSec = Math.floor(diffInMilliSec / 1000);
    const minutes = Math.floor((diffInSec % (60 * 60)) / 60);
    const hours = Math.floor((diffInSec % (60 * 60 * 24)) / (60 * 60));
    const days = Math.floor(
      (diffInSec % (60 * 60 * 24 * 365)) / (60 * 60 * 24)
    );
    const weeks = Math.floor(days / 7);
    const years = Math.floor(diffInSec / (60 * 60 * 24 * 365));

    const timevalue = [minutes, hours, days, weeks, years];
    const timeunits = ["min", "hours", "days", "weeks", "years"];
    let timeago = "";
    let bignum = 0;
    let unit = "";

    for (let i = timevalue.length - 1; i >= 0; i--) {
      if (timevalue[i] === 0) continue;

      if (bignum < timevalue[i]) {
        bignum = timevalue[i];
        unit = timeunits[i];
        break;
      }
    }
    if (bignum) timeago = bignum + " " + unit + " ago";

    if (bignum === 0) return "  Just now";
    else return timeago;
  };

  const renderContent = () => {
    switch (activeNav) {
      case "Home":
        return allPosts && allPosts.length > 0 ? (
          allPosts.map((item, index) => (
            <PostItem
              key={index}
              title={item.title}
              description={item.description}
              videoFile={item.videoFile}
              thumbnail={item.thumbnail}
              view={item.view}
              videoId={item._id}
              createdAt={item.createdAt}
              userinfo={allUsers[index]}
              compareDate={compareDate}
            />
          ))
        ) : (
          <h2>Start with searching something</h2>
        );
      case "shorts":
        return <UnderDev />;
      case "Subscriptions":
        return subscribedPosts && subscribedPosts.length > 0 ? (
          subscribedPosts.map((item, index) => (
            <PostItem
              key={index}
              title={item.title}
              description={item.description}
              videoFile={item.videoFile}
              thumbnail={item.thumbnail}
              userName={item.userName}
              view={item.view}
              compareDate={compareDate}
            />
          ))
        ) : (
          <h2>No subscriptions</h2>
        );
      case "Update account":
        return <Updateuser />;
      case "Update avatar":
        return <UpdateAvatar />;
      case "Update coverImage":
        return <UpdateCover />;
      case "fullscreen_video":
        return <Fullscreen video_info={video_info} compareDate={compareDate} />;
      default:
        return <UnderDev />;
    }
  };


  return (
    <div
      className="post-container"
      onClick={() => dispatch(toggleProMenu(false))}
    >
      {loading ? <Loader /> : renderContent()}
    </div>
  );
}

export default Footer;
