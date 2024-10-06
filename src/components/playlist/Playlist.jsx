import { useEffect, useState } from "react";
import Loader from "../Loader/Loder";
import { useDispatch, useSelector } from "react-redux";
import ListContainer from "./ListContainer";
import { setAllPlaylists } from "../../store/authSlice";

import "./playlist.css";
function Playlist() {
  const [playlistsarr, setPlaylistsarr] = useState([]);
  const [loading, setLoading] = useState(false);
  const userid = useSelector((state) => state.auth.data._id);
  const dispatch = useDispatch();
  useEffect(() => {
    const getallPlaylists = async () => {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/playlist/user/${userid}`,
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
          console.log("error fetching playlists ", error);
          alert(error.message);
          return;
        }

        const responseData = await response.json();

        console.log("got playlists ", responseData);

        setPlaylistsarr(responseData.data);
        console.log("setting store data");

        dispatch(setAllPlaylists(responseData.data));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getallPlaylists();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="containerbox">
          <h2>Playlists</h2>
          <div className="flexbox">
            {playlistsarr && playlistsarr.length !== 0 ? (
              playlistsarr.map((playlist) => (
                <ListContainer
                  key={playlist._id}
                  playlist={playlist}
                  owner={playlist.owner}
                  playlistsarr={playlistsarr}
                />
              ))
            ) : (
              <p>No Playlists found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Playlist;
