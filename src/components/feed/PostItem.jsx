/* eslint-disable react/prop-types */
import { SlOptionsVertical } from "react-icons/sl";
import "./feed.css";
import { useState } from "react";
import Fullscreen from "../videoscreen/Fullscreen";

// eslint-disable-next-line react/prop-types
function PostItem({
  title,
  description,
  videoFile,
  thumbnail,
  userName,
  view,
}) {
  const [showFullVideo, setShowFullVideo] = useState(false);

  return (
    <>
      {showFullVideo ? (
        <Fullscreen video={videoFile} setShowFullVideo={setShowFullVideo} />
      ) : (
        <div
          className="postbox applyflex"
          onClick={() => setShowFullVideo(true)}
        >
          <div className="top applyflex">
            <img className="thumbnail" src={thumbnail} alt="thumbnail" />
          </div>
          <div className="middle applyflex">
            <div className="title">
              {title} | {description}
            </div>
            <div className="options">
              <SlOptionsVertical />
            </div>
          </div>
          <div className="bottom">
            <p className="profilename">{userName}</p>
            <p className="video-details">{view} views | 10months ago</p>
          </div>
        </div>
      )}
    </>
  );
}

export default PostItem;
