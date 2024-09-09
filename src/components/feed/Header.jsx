import { IoSearch } from "react-icons/io5";
import { TiMicrophoneOutline } from "react-icons/ti";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";

import "./feed.css";
function Header() {
  let profilepic = useSelector((state) => state.auth.data?.avatar);
  return (
    <div className="container applyflex">
      <div className="search">
        <input type="text" placeholder="Search" />
        <div className="iconbox">
          <IoSearch />
        </div>
      </div>
      <div className="mike applyflex">
        <TiMicrophoneOutline />
      </div>
      <div className="lastitems applyflex">
        <div className="notificaton applyflex">
          <IoIosNotificationsOutline />
        </div>
        <div className="profile">
          <img src={profilepic} alt="profilepic" />
        </div>
      </div>
    </div>
  );
}

export default Header;
