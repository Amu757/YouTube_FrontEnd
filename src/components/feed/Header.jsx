import { IoSearch } from "react-icons/io5";
import { TiMicrophoneOutline } from "react-icons/ti";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { toggleProMenu } from "../../store/authSlice";
import UserMenu from "./UserMenu";

import "./feed.css";
// import { useState } from "react";
function Header() {
  let profilepic = useSelector((state) => state.auth.data?.avatar);
  // const [profileIsCliked, setProfileIsClicked] = useState(useSelector((state) => state.auth.showprofilemenu));
  const profileIsCliked = useSelector((state) => state.auth.showprofilemenu);
  const dispatch = useDispatch();

  return (
    <div className="container applyflex">
      {profileIsCliked && <UserMenu profileIsCliked={profileIsCliked} />}
      <>
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
          <div
            className="profile"
            onClick={() => {
              // setProfileIsClicked(!profileIsCliked);
              dispatch(toggleProMenu(!profileIsCliked));
            }}
          >
            <img src={profilepic} alt="profilepic" />
          </div>
        </div>
      </>
    </div>
  );
}

export default Header;
