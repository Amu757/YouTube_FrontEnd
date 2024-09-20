import { useNavigate } from "react-router-dom";
import { changeNav } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import "./nav.css";

function Option({ Icon, item, goto = "" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    let clickedOn = "Home";
    switch (goto) {
      case "/":
        navigate(goto);
        clickedOn = "Home";
        break;
      // case "shorts":
      //   clickedOn = "shorts";
      //   break;
      // case "subVid":
      //   clickedOn = "subVid";
      //   break;
      // case "profilepage":
      //   clickedOn = "profilepage";
      // break;
      default:
        clickedOn = goto;
      // if (goto) navigate(goto);
    }
    dispatch(changeNav(clickedOn));
  };

  return (
    <div className="option-box" onClick={handleClick}>
      <div className="icon">
        <Icon />
      </div>
      <div className="item">{item}</div>
    </div>
  );
}

export default Option;
