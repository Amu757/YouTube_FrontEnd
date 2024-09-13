import Header from "./Header";
import Copyright from "./Copyright";
import Explore from "./Explore";
import Footer from "./Footer";
import More from "./More";
import Subscription from "./Subscription";
import You from "./You";

import "./nav.css";

function Navigation() {
  return (
    <div className="navigation-box">
      <Header />
      <You/>
      <Subscription />
      <Explore />
      <More />
      <Footer />
      <Copyright />
    </div>
  );
}

export default Navigation;
