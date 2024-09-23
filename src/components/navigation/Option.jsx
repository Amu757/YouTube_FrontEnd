import { changeNav, changeUsername } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./nav.css";

function Option({ Icon, navName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.data?.userName);
  const handleClick = () => {
    switch (navName) {
      case "Add Video":
        navigate("/createpost");
        break;
      case "Your Channel":
        dispatch(changeUsername(username));
        setTimeout(() => {
          dispatch(changeNav("profilepage"));
        }, 50);
        break;

      default:
    }
  };

  return (
    <div className="option-box" onClick={handleClick}>
      {navName === "GiftTube" ? (
        <>
          <div className="icon">
            <Icon fontSize="40px" fill="yellow" />
          </div>
          <div className="item" style={{fontSize:"25px", color:"yellow"}}>
            {navName}
          </div>
        </>
      ) : (
        <>
          <div className="icon">
            <Icon />
          </div>
          <div className="item">{navName}</div>
        </>
      )}
    </div>
  );
}

export default Option;
