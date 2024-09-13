import { useEffect, useState } from "react";
import ApiOption from "./ApiOption";
import ProfileGate from "./ProfileGate";
import { BiSolidUserPin } from "react-icons/bi";
import "./feed.css";
function UserMenu({ profileIsCliked }) {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    console.log("value of profieis clicked ,", profileIsCliked);
    if (profileIsCliked) setShowMenu(true);
    else setShowMenu(false);
  }, [showMenu, profileIsCliked]);
  return (
    <>
      {showMenu && (
        <>
          <div className="menubox">
          <ProfileGate />
            <ApiOption apiName="Sign out" Icon={BiSolidUserPin}  />
            <hr />
            <ApiOption apiName="Settings" Icon={BiSolidUserPin} />
            <ApiOption apiName="Reset password" Icon={BiSolidUserPin} />
            <hr />
            <ApiOption apiName="Help" Icon={BiSolidUserPin} />
            <ApiOption apiName="Send feedback" Icon={BiSolidUserPin} />
          </div>
        </>
      )}
    </>
  );
}

export default UserMenu;
