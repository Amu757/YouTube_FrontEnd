/* eslint-disable react/prop-types */

import { changePlaylist } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

function ListContainer({ playlist }) {
  const { name, description, videos } = playlist;
  const [videosarr, setVideosarr] = useState(videos);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    await dispatch(changePlaylist(playlist));
    navigate("/playlist");
  };

  return (
    <div className="list-container" onClick={handleClick}>
      <div className="top">
        <img src="./myimage.png" alt="thumbnail" />
        <p>{videosarr.length} videos</p>
      </div>
      <div className="bottom">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
export default ListContainer;
