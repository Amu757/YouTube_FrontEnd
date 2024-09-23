import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import Profilepage from "../../pages/Profilepage";

import "./feed.css";
function Feed() {
  const activeNav = useSelector((state) => state.auth.activeNav);

  return (
    <div className="feed-container">
      {activeNav === "profilepage" ? (
        <Profilepage />
      ) : (
        <>
          <Header />
          <Footer />
        </>
      )}
    </div>
  );
}

export default Feed;
