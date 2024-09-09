import Option from "./Option"
import { SiCoinmarketcap } from "react-icons/si";
import { IoIosArrowDropdown } from "react-icons/io";

import "./nav.css";
function Subscription() {
  return (
    <>
    <section className="navsection sub" >
      <div className="title">
        <h4 >Subscriptions</h4>
      </div>
      <Option Icon={SiCoinmarketcap} item="StudyIQ IAS" />
      <Option Icon={SiCoinmarketcap} item="StudyIQ IAS" />
      <Option Icon={SiCoinmarketcap} item="StudyIQ IAS" />
      <Option Icon={IoIosArrowDropdown} item="Show More" />
      <hr className="rular" />
    </section>
  </>
  );
}

export default Subscription;
