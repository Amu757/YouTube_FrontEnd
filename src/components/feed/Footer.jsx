import PostItem from "./PostItem";
import Loader from "../Loader/Loder";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
function Footer() {
  const [loading, setLoading] = useState(false);
  const Loggedin = useSelector((state) => state.auth.status);
  const activeNav = useSelector((state) => state.auth.activeNav);
  const userid = useSelector((state) => state.auth.data?._id);
  const [allPosts, setAllPosts] = useState([]);
  const [allShorts, setAllShorts] = useState([]);
  const [subscribedPosts, setSubscribedPosts] = useState([]);

  const getvideos = async () => {
    const token = localStorage.getItem("accessToken");
    if(!token) return;
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/video/getSubscribedVideos?page=1&limit=10&query=0&sortBy=createdAt&sortType=1",
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

      const videos = await response.json();
      setAllPosts(videos.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubVid = async () => {

    const token = localStorage.getItem("accessToken");
    if(!token)return
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
      console.log("activeNav is changed ", activeNav);
      switch (activeNav) {
        case "home":
          getvideos();
          break;
        case "shorts":
          // ();
          break;
        case "subVid":
          getSubVid();
          break;
        default:
          console.log("null");
          break;
      }
    };
    if (activeNav) fetchData();
  }, [activeNav, Loggedin]);

  return (
    <div className="post-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          {activeNav === "home" ? (
            allPosts && allPosts.length > 0 ? (
              allPosts.map((item, index) => (
                <PostItem
                  key={index}
                  title={item.title}
                  description={item.description}
                  videoFile={item.videoFile}
                  thumbnail={item.thumbnail}
                  userName={item.userName}
                  view={item.view}
                />
              ))
            ) : (
              <h2>Start with searching something</h2>
            )
          ) : activeNav === "shots" ? (
            allShorts && allShorts.length > 0 ? (
              allShorts.map((item, index) => (
                <PostItem
                  key={index}
                  title={item.title}
                  description={item.description}
                  videoFile={item.videoFile}
                  thumbnail={item.thumbnail}
                  userName={item.userName}
                  view={item.view}
                />
              ))
            ) : (
              <h2>Under development</h2>
            )
          ) : activeNav === "subVid" ? (
            subscribedPosts && subscribedPosts.length > 0 ? (
              subscribedPosts.map((item, index) => (
                <PostItem
                  key={index}
                  title={item.title}
                  description={item.description}
                  videoFile={item.videoFile}
                  thumbnail={item.thumbnail}
                  userName={item.userName}
                  view={item.view}
                />
              ))
            ) : (
              <h2>No subscriptions</h2>
            )
          ) : (
            <h2>Select a valid navigation tab</h2>
          )}
        </>
      )}
    </div>
  );
}

export default Footer;
