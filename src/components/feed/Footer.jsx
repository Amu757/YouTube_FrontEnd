import PostItem from "./PostItem";
import Loader from "../Loader/Loder";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
function Footer() {
  const [loading, setLoading] = useState(false);
  const Loggedin = useSelector((state) => state.auth.status);
  const [allPosts, setAllPosts] = useState([]);

  const getvideos = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/video/getSubscribedVideos?page=1&limit=10&query=0&sortBy=createdAt&sortType=1",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
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

  useEffect(() => {
    setLoading(true);
    getvideos();
  }, [Loggedin]);

  return (
    <div className="post-container">
      {loading ? (
        <Loader />
      ) : allPosts && allPosts.lenth < 0 ? (
        <h2>start with search something</h2>
      ) : (
        allPosts.map((item, index) => <PostItem key={index} title={item.title} description={item.description} videoFile={item.videoFile} thumbnail={item.thumbnail} userName={item.userName} view={item.view} />)
      )}
    </div>
  );
}

export default Footer;
