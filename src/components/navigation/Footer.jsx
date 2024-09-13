import Option from "./Option";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegFlag } from "react-icons/fa";
import { IoMdHelpCircle } from "react-icons/io";
import { RiFeedbackLine } from "react-icons/ri";

function Footer() {
  return (
    <>
      <section className="navsection">
        <Option Icon={IoSettingsOutline} item="Settings" />
        <Option Icon={FaRegFlag} item="Report history" />
        <Option Icon={IoMdHelpCircle} item="Help" />
        <Option Icon={RiFeedbackLine} item="Send feedback" />
        <hr className="rular" />
      </section>
    </>
  );
}

export default Footer;
