import { useNavigate } from "react-router-dom";
import { toggleNav } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import "./nav.css";

function Option({ Icon, item, goto = "" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    let clickedOn = "home";
    switch (goto) {
      case "/":
        navigate(goto);
        clickedOn = "home";
        break;
      case "shorts":
        navigate("/");
        clickedOn = "shorts";
        break;
      case "subVid":
        clickedOn = "subVid";
        break;
      default:
        if (goto) navigate(goto);
    }
    dispatch(toggleNav(clickedOn));
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
