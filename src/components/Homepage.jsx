import Feed from "./feed/Feed";
import Navigation from "./navigation/Navigation";
import "./style.css"
function Homepage() {
  return (
    <div className="homepage">
      <Navigation />
      <Feed />
    </div>
  );
}

export default Homepage;
