import Header from "../components/feed/Header";
import ListNames from "../components/playlist/ListNames";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import VideoItem from "../components/playlist/VideoItem";
import "../components/feed/feed.css";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

import "./pages.css";
import { useNavigate } from "react-router-dom";

function Playlistpage() {
  const sideMenu = useSelector((state) => state.auth.showPlaylistmenu);
  const currentPlaylist = useSelector((state) => state.auth.currentPlaylist);
  const [videolist, setVideolist] = useState(currentPlaylist.allVideos);

  const [showform, setShowform] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm();
  const navigate = useNavigate();
  const newName = watch("name");
  const newDescription = watch("description");

  // console.log("list form store ", playlistdata);

  useEffect(() => {
    if (currentPlaylist) {
      setValue("name", currentPlaylist.name);
      setValue("description", currentPlaylist.description);
      setVideolist(currentPlaylist.allVideos);
    }
  }, [currentPlaylist, setValue]);

  const handleEdit = async (data) => {
    if (
      data.name === currentPlaylist.name &&
      data.description === currentPlaylist.description
    ) {
      console.log("data found same ", data, currentPlaylist);
      alert("No changes found ..");
      return;
    }
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/playlist/${currentPlaylist.id}`,
        {
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("your response : ", response);
      if (!response.ok) {
        const error = await response.json();
        console.log("error in update playlist", error);
        alert(error.message);
        return;
      }

      const responsedata = await response.json();
      console.log("successful updated playlist: ", responsedata);

      alert("Successful Updated playlist");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (confirm("Do you want to delete this playlist?")) {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/playlist/${currentPlaylist.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("your response : ", response);
        if (!response.ok) {
          const error = await response.json();
          console.log("error in delete playlist", error);
          navigate("/");
          alert(error.message);
          return;
        }

        const responsedata = await response.json();
        console.log("successful deleted playlist: ", responsedata);
        navigate("/");
        alert("Successful deleted playlist");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleNameChange = (e) => {
    setValue("name", e.target.value);
  };
  const handleDesChange = (e) => {
    setValue("description", e.target.value);
  };

  return (
    <div className="showcontainer">
      <Header />
      <div className="bottombox_">
        <div className="leftbox_">
          <video controls autoPlay>
            <source src="./videot" type="video/mp4" />
          </video>
        </div>
        <div className="rightbox_">
          <div className="topbox_">
            <h3>{currentPlaylist.name}</h3>
            <div className="api-options">
              <p>{currentPlaylist.description}</p>
              <div className="btnlist">
                <div onClick={() => setShowform(true)} title="Edit Playlist">
                  <FiEdit3 />
                </div>
                <div onClick={handleDelete} title="Delete Playlist">
                  <MdDeleteOutline />
                </div>
              </div>
            </div>
            <hr />
          </div>
          <div className="bottom_">
            {showform ? (
              <form onSubmit={handleSubmit(handleEdit)}>
                <input
                  type="text"
                  placeholder="Name of Playlist"
                  value={newName || ""}
                  {...register("name")}
                  onChange={(e) => handleNameChange(e)}
                />
                <input
                  type="text"
                  placeholder="Description.."
                  value={newDescription || ""}
                  {...register("description")}
                  onChange={(e) => handleDesChange(e)}
                />
                <div className="btns">
                  <button
                    type="button"
                    onClick={() => {
                      // reset();
                      setShowform(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit">Submit</button>
                </div>
              </form>
            ) : videolist && videolist.length !== 0 ? (
              videolist.map((video, index) => (
                <VideoItem key={index} srnum={index + 1} video={video} />
              ))
            ) : (
              "No videos found"
            )}
          </div>
        </div>
      </div>
      {sideMenu && <ListNames />}
    </div>
  );
}

export default Playlistpage;
