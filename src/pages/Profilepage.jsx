/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleProMenu } from "../store/authSlice";
import Loader from "../components/Loader/Loder";
import "./pages.css";

const Menubaritem = ({ text, setActive }) => {
  const handleclick = () => {
    setActive(text);
  };
  return <h4 onClick={handleclick}>{text}</h4>;
};

const PlaylistItem = ({ item }) => {
  const {
    thumbnail,
    videoFile,
    duration,
    title,
    view,
    createdAt,
    description,
  } = item;
  console.log(thumbnail, duration);
  return (
    <div className="item_container">
      <div className="video_box">
        {/* <video controls autoPlay>
          <source src={videoFile} type="video/mp4" />
        </video> */}
        <img src={thumbnail} alt="thumbnail" />
      </div>
      <div className="vid_info">
        <h2>{title}</h2>
        <p>
          {view} views . {duration} years ago .{" "}
        </p>
        <p>{description}</p>
      </div>
      <RxHamburgerMenu />
    </div>
  );
};

export const VideoItem = ({ item }) => {
  const {
    thumbnail,
    videoFile,
    duration,
    title,
    view,
    createdAt,
    description,
  } = item;
  return (
    <div className="item_container">
      <div className="video_box">
        {/* <video controls autoPlay>
          <source src={videoFile} type="video/mp4" />
        </video> */}
        <img src={thumbnail} alt="thumbnail" />
      </div>
      <div className="vid_info">
        <h2>{title}</h2>
        <p>
          {view} views . {duration} years ago .{" "}
        </p>
        <p>{description}</p>
      </div>
      <RxHamburgerMenu />
    </div>
  );
};

function Profilepage() {
  const userName = useSelector((state) => state.auth.profileUserName);
  const [data, setData] = useState({});

  const [myVideos, setMyvideos] = useState([]);
  const [myPlaylists, setMyplalists] = useState([]);
  const [stats, setStats] = useState({});
  const [active, setActive] = useState("Home");
  const [pageload, setPageload] = useState(false);
  const dispatch = useDispatch();
  // const [contentload, setContentload] = useState(false);

  const getuser = async () => {
    const token = localStorage.getItem("accessToken");
    console.log("profile fetching");
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/users/c/${userName}`,
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
        console.log("error in get profile data", error);
        alert("error in fetching profile");
        return;
      }

      const responsedata = await response.json();
      console.log("res: ", response);
      const user_info = responsedata.data;
      console.log("data: ", user_info);
      setData(responsedata.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getvideos = async () => {
    const token = localStorage.getItem("accessToken");
    console.log("profile fetching");
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/video/getmyvideos?page=1&limit=10&query=0&sortBy=createdAt&sortType=1`,
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
        console.log("error in get profile data", error);
        alert("error in fetching profile");
        return;
      }

      const responsedata = await response.json();
      console.log("get videos res: ", responsedata);
      setMyvideos(responsedata.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getplaylists = async () => {
    const token = localStorage.getItem("accessToken");
    console.log("fetching playlists");
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/playlist/user/${data._id}`,
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
        console.log("error in get plalists data", error);
        alert("error in fetching playlists");
        return;
      }

      const responsedata = await response.json();
      console.log("res: ", response);
      const allplalists = responsedata.data;
      console.log("data: ", allplalists);
      setMyplalists(allplalists);
    } catch (error) {
      console.log(error);
    }
  };

  const getDashboard = async () => {
    const token = localStorage.getItem("accessToken");
    console.log("fetching Dashboard");
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/dashboard/stats`,
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
        console.log("error in get Dashboard data", error);
        alert("error in fetching Dashboard");
        return;
      }

      const responsedata = await response.json();
      console.log("res: ", response);
      const userdata = responsedata.data;
      console.log("data: ", userdata);
      setStats(userdata);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setPageload(true);
    dispatch(toggleProMenu(false));
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        switch (active) {
          case "Home":
            await getuser();
            await getvideos();
            setPageload(false);
            break;
          case "Videos":
            // await getvideos();
            break;
          case "Playlists":
            await getplaylists();
            break;
          case "Dashboard":
            await getDashboard();
            break;
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [active]);
  return (
    <>
      <div className="profile-container">
        {pageload ? (
          <Loader />
        ) : (
          <>
            <div className="top-container">
              <div className="image_box">
                <img src={data?.avatar} alt="mypic" />
              </div>
              <div className="info_box">
                <h2>{data?.fullName}</h2>
                <h3>
                  @{userName} . {data?.subscribersCount} subscribers .{" "}
                  {myVideos?.length} video
                </h3>
                <p>
                  {data?.about} <strong>More</strong>{" "}
                </p>
                <div className="buttons_box">
                  <button className="probtn">Customise Channel</button>
                  <button className="probtn">Manage Videos</button>
                </div>
              </div>
            </div>
            <div className="menubar">
              <Menubaritem text={"Home"} setActive={setActive} />
              <Menubaritem text={"Videos"} setActive={setActive} />
              <Menubaritem text={"Playlists"} setActive={setActive} />
              <Menubaritem text={"Dashboard"} setActive={setActive} />
              <div className="iconsearch">
                <IoSearch />
              </div>
              <div
                className="activebar"
                style={{
                  left:
                    active === "Home"
                      ? "0vw"
                      : active === "Videos"
                      ? "4.6vw"
                      : active === "Playlists"
                      ? "9.9vw"
                      : "16vw",
                }}
              ></div>
            </div>
            <hr />
            <div className="footer_container">
              {active === "Home" || active === "Videos" ? (
                <>
                  <h3 className="title">Videos</h3>
                  <div className="container">
                    {myVideos && myVideos.length !== 0 ? (
                      myVideos.map((item) => (
                        <VideoItem key={item._id} item={item} />
                      ))
                    ) : (
                      <h3>No videos found</h3>
                    )}
                  </div>
                </>
              ) : active === "Playlists" ? (
                <>
                  <h3 className="title">Created Playlists</h3>
                  <div className="container">
                    {myPlaylists && myPlaylists.length !== 0 ? (
                      myPlaylists.map((item) => (
                        <PlaylistItem key={item._id} item={item} />
                      ))
                    ) : (
                      <h3>No playlist found</h3>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="title">Dashboard</h3>
                  <div className="container">
                    {stats ? (
                      <>
                        <h5>{stats.totalViews} totalViews</h5>
                        <h5>{stats.totalVideos} totalVideos</h5>
                        <h5>{stats.totalLikes} totalLikes</h5>
                        <h5>{stats.totalSubscribers} totalSubscribers</h5>
                      </>
                    ) : (
                      <h3>No Dashboard results</h3>
                    )}
                  </div>
                </>
              )}
              <hr />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Profilepage;
