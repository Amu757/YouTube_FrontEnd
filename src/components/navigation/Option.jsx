import { useNavigate } from "react-router-dom";
import "./nav.css";

function Option({ Icon, item }) {
  const navigate = useNavigate()
  return (
    <div className="option-box" onClick={()=>navigate("/video")}>
      <div className="icon">
        <Icon />
      </div>
      <div className="item">{item}</div>
    </div>
  );
}

export default Option;
