import { useSelector, useDispatch } from "react-redux";
import { changeNav } from "../../store/authSlice";

import "./feed.css";
function ProfileGate() {
  const fullname = useSelector((state) => state.auth.data?.fullName);
  const username = useSelector((state) => state.auth.data?.userName);
  const pic = useSelector((state) => state.auth.data?.avatar);
  const dispatch = useDispatch();
  return (
    <>
      <div className="menu-head">
        <div className="propic">
          <img src={pic} alt="propic" />
        </div>
        <div className="yourinfo">
          <h4>{fullname}</h4>
          <h4>{username}</h4>
          <p onClick={() => dispatch(changeNav("profilepage"))}>
            View you channel
          </p>
        </div>
      </div>
    </>
  );
}

export default ProfileGate;
