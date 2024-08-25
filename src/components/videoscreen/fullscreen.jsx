import { CgCloseO } from "react-icons/cg";
import "./style.css"
function fullscreen() {
  return (
    <div className="fullscreen">
      <div className="videobox">
        <div className="close">
          <CgCloseO />
        </div>
      </div>
    </div>
  );
}

export default fullscreen;
