import { useEffect, useState } from "react";
import ApiOption from "./ApiOption";
import ProfileGate from "./ProfileGate";
import { BiSolidUserPin } from "react-icons/bi";
import "./feed.css";
function UserMenu({ profileIsCliked }) {
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    if (profileIsCliked) setShowMenu(true);
    else setShowMenu(false);
  }, [profileIsCliked]);
  return (
    <>
      {showMenu && (
        <>
          <div className="menubox">
            <ProfileGate />
            <ApiOption
              apiName="Sign out"
              Icon={BiSolidUserPin}
              setShowMenu={setShowMenu}
            />
            <hr />
            <ApiOption
              apiName="Update account"
              Icon={BiSolidUserPin}
              setShowMenu={setShowMenu}
            />
            <ApiOption
              apiName="Update avatar"
              Icon={BiSolidUserPin}
              setShowMenu={setShowMenu}
            />
            <ApiOption
              apiName="Update coverImage"
              Icon={BiSolidUserPin}
              setShowMenu={setShowMenu}
            />
            <ApiOption
              apiName="Reset password"
              Icon={BiSolidUserPin}
              setShowMenu={setShowMenu}
            />
            <hr />
            <ApiOption
              apiName="Help"
              Icon={BiSolidUserPin}
              setShowMenu={setShowMenu}
            />
            <ApiOption
              apiName="Send feedback"
              Icon={BiSolidUserPin}
              setShowMenu={setShowMenu}
            />
          </div>
        </>
      )}
    </>
  );
}

export default UserMenu;
