import Option from "./Option";
import { IoMdHome } from "react-icons/io";
import { BiSolidVideos } from "react-icons/bi";
import { MdSubscriptions } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import "./nav.css";

function Header() {
  return (
    <div className="head">
      <section className="navsection">
        <div className="title">
          <RxHamburgerMenu className="menu" />
          <h2>Youtube logo</h2>
        </div>
        <Option Icon={IoMdHome} item="Home" />
        <Option Icon={BiSolidVideos} item="Shorts" />
        <Option Icon={MdSubscriptions} item="Subscriptions" />
        <hr className="rular" />
      </section>
    </div>
  );
}

export default Header;
