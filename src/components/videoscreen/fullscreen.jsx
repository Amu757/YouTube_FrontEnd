/* eslint-disable react/prop-types */
import { CgCloseO } from "react-icons/cg";
import "./style.css";
function Fullscreen({ video,setShowFullVideo }) {
  return (
    <div className="fullscreen">
      <div className="videobox">
        <video controls autoPlay>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="close" onClick={()=>setShowFullVideo(false)}>
          <CgCloseO />
        </div>
      </div>
    </div>
  );
}

export default Fullscreen;
