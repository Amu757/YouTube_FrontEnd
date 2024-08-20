import { SlOptionsVertical } from "react-icons/sl";

import "./feed.css";
function PostItem() {
  return (
    <div className="postbox applyflex">
      <div className="top applyflex">
        <img className="thumbnail" src="../../../public/vite.svg" alt="" />
      </div>
      <div className="middle applyflex">
        <div className="title">sample post for getting better at programming</div>
        <div className="options">
          <SlOptionsVertical />
        </div>
      </div>
      <div className="bottom">
        <p className="profilename"></p>
        <p className="video-details">
          10.4M views | 10months ago 
        </p>
      </div>
    </div>
  );
}

export default PostItem;
