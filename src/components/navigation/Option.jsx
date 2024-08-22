import "./nav.css";
function Option({ Icon, item }) {
  return (
    <div className="option-box">
      <div className="icon">
        <Icon />
      </div>
      <div className="item">{item}</div>
    </div>
  );
}

export default Option;
