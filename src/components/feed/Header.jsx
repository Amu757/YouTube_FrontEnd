import { IoSearch } from "react-icons/io5";
import { TiMicrophoneOutline } from "react-icons/ti";
import { IoIosNotificationsOutline } from "react-icons/io";

import "./feed.css";
function Header() {
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
      <div className="notificaton applyflex">
        <IoIosNotificationsOutline/>
      </div>
      <div className="profile">
        <img src="../../../public/vite.svg" alt="" />
      </div>
    </div>
  );
}

export default Header;
