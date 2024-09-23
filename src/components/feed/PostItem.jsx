/* eslint-disable react/prop-types */
import { SlOptionsVertical } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { changeNav,changeUsername } from "../../store/authSlice";
import "./feed.css";

// eslint-disable-next-line react/prop-types
function PostItem({
  title,
  description,
  videoFile,
  thumbnail,
  view,
  videoId,
  createdAt,
  userinfo,
  compareDate,
}) {
  const dispatch = useDispatch();
  let video_info = {
    navname: "fullscreen_video",
    title,
    description,
    videoFile,
    thumbnail,
    view,
    videoId,
    createdAt,
    userinfo,
  };

  const { userName, avatar } = userinfo;

const handleClick =()=>{
    dispatch(changeUsername(userName));
    setTimeout(() => {
      dispatch(changeNav("profilepage"));
    }, 50);
}

  return (
    <div className="postbox applyflex">
      <div
        className="top applyflex"
        onClick={() => dispatch(changeNav(video_info))}
      >
        <img className="thumbnail" src={thumbnail} alt="thumbnail" />
      </div>
      <div className="middle applyflex">
        <div className="pic" onClick={handleClick}>
          <img src={avatar} alt="profile" />
        </div>
        <div className="title">
          {title} | {description}
        </div>
        <div className="options">
          <SlOptionsVertical />
        </div>
      </div>
      <div className="bottom applyflex">
        <p className="profilename" onClick={handleClick}>{userName}</p>
        <p className="video-details">
          {view} views | {compareDate(createdAt)}
        </p>
      </div>
    </div>
  );
}

export default PostItem;
