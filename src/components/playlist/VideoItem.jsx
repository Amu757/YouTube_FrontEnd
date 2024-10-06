/* eslint-disable react/prop-types */
import { SlOptionsVertical } from "react-icons/sl";
import Menu from "./Menu";
import { useState } from "react";
import "./playlist.css"

const VideoItem = ({ srnum, video }) => {
    // const { title, duration } = video;
  let title = "title",
    duration = "12 s";
  const [optionIcon, setOptionIcon] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handlehover = () => {
    setOptionIcon(!optionIcon);
  };

  return (
    <div
      className="container-box"
      onMouseEnter={handlehover}
      onMouseLeave={() => {
        handlehover();
        setShowMenu(false);
      }}
    >
      <p>{srnum}</p>
      <div className="thumbnail">
        <img src="./myimage.png" alt="thumbnail" />
      </div>
      <div className="info">
        <h3>{title}</h3>
        <p>user name</p>
        <p>{duration}</p>
      </div>
      {optionIcon && (
        <div
          className="optionbox"
          onClick={() => {
            setShowMenu(!showMenu);
            console.log("cliked");
          }}
        >
          <SlOptionsVertical />
        </div>
      )}
      {showMenu && <Menu />}
    </div>
  );
};

export default VideoItem;
