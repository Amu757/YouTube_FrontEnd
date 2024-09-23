import Option from "./Option";
import { IoSettingsOutline } from "react-icons/io5";
import { RiFeedbackLine } from "react-icons/ri";
import { MdHelpOutline } from "react-icons/md";
import { IoFlagOutline } from "react-icons/io5";


function Footer() {
  return (
    <>
      <section className="navsection">
        <Option Icon={IoSettingsOutline} navName="Settings" />
        <Option Icon={IoFlagOutline} navName="Report history" />
        <Option Icon={MdHelpOutline} navName="Help" />
        <Option Icon={RiFeedbackLine} navName="Send feedback" />
        <hr className="rular" />
      </section>
    </>
  );
}

export default Footer;
