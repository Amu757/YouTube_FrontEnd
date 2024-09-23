import Option from "./Option";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { MdOutlineSubscriptions } from "react-icons/md";
// import { RxHamburgerMenu } from "react-icons/rx";
import { GiGiftOfKnowledge } from "react-icons/gi";

import "./nav.css";

function Header() {
  return (
    <div className="head">
      <section className="navsection">
        <div className="title">
          {/* <RxHamburgerMenu className="menu" /> */}
          <Option Icon={GiGiftOfKnowledge} navName="GiftTube" />
        </div>
        <Option Icon={IoHomeOutline} navName="Home" />
        <Option Icon={MdOutlineVideoLibrary} navName="Shorts" />
        <Option Icon={MdOutlineSubscriptions} navName="Subscriptions" />
        <hr className="rular" />
      </section>
    </div>
  );
}

export default Header;
