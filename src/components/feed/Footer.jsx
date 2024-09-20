import PostItem from "./PostItem";
import Loader from "../Loader/Loder";
import Profilepage from "../../pages/Profilepage";
import Updateuser from "../../pages/Updateuser";
import UpdateAvatar from "../../pages/UpdateAvatar";
import UpdateCover from "../../pages/UpdateCover";
import { toggleProMenu } from "../../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./feed.css";
import Fullscreen from "../videoscreen/Fullscreen";

const UnderDev = () => {
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
  const videofile = useSelector((state) => state.auth.vidUrl);
  const videoId = useSelector((state) => state.auth.videoId);
  // const userid = useSelector((state) => state.auth.data?._id);
  // const [allShorts, setAllShorts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [subscribedPosts, setSubscribedPosts] = useState([]);
  const dispatch = useDispatch();

  const getvideos = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
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
      console.log("activeNav is changed ", activeNav);
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

  return (
    <div
      className="post-container"
      onClick={() => dispatch(toggleProMenu(false))}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          {activeNav === "Home" ? (
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
                  videoId={item._id}
                />
              ))
            ) : (
              <h2>Start with searching something</h2>
            )
          ) : activeNav === "shots" ? (
            <UnderDev />
          ) : // allShorts && allShorts.length > 0 ? (
          //   allShorts.map((item, index) => (
          //     <PostItem
          //       key={index}
          //       title={item.title}
          //       description={item.description}
          //       videoFile={item.videoFile}
          //       thumbnail={item.thumbnail}
          //       userName={item.userName}
          //       view={item.view}
          //     />
          //   ))

          // ) : (
          //  <h2>No shorts found</h2>
          // )
          activeNav === "subVid" ? (
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
          ) : activeNav === "profilepage" ? (
            <Profilepage />
          ) : activeNav === "Update account" ? (
            <Updateuser />
          ) : activeNav === "Update avatar" ? (
            <UpdateAvatar />
          ) : activeNav === "Update coverImage" ? (
            <UpdateCover />
          ) : activeNav === "fullscreen video" ? (
            <Fullscreen video={videofile} videoId={videoId}/>
          ) : (
            <UnderDev />
          )}
        </>
      )}
    </div>
  );
}

export default Footer;
