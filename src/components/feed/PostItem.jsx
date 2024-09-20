/* eslint-disable react/prop-types */
import { SlOptionsVertical } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { changeNav } from "../../store/authSlice";
import "./feed.css";

// eslint-disable-next-line react/prop-types
function PostItem({
  title,
  description,
  videoFile,
  thumbnail,
  userName,
  view,
  videoId,
}) {
  const dispatch = useDispatch();
  let attributes = {
    navname: "fullscreen video",
    videourl: videoFile,
    videoId: videoId
  };

  return (
    <div
      className="postbox applyflex"
      onClick={() => dispatch(changeNav(attributes))}
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
  );
}

export default PostItem;
