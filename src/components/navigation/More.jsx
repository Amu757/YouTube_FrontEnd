import Option from "./Option"
import { IoLogoYoutube } from "react-icons/io";
import { RiVideoLine } from "react-icons/ri";
import { MdMusicVideo } from "react-icons/md";
import { SiYoutubekids } from "react-icons/si";
import { IconContext } from "react-icons/lib";

function More() {
  return (
    <IconContext.Provider value={{color:"yellow"}}>
    <section className="navsection">
      <div className="title">
        <h4>More from YouTube</h4>
      </div>
      <Option Icon={IoLogoYoutube} navName="YouTube Premium" />
      <Option Icon={RiVideoLine} navName="YouTube Studio" />
      <Option Icon={MdMusicVideo} navName="YouTube Music" />
      <Option Icon={SiYoutubekids} navName="YouTube Kids" />
      <hr className="rular" />
    </section>
    </IconContext.Provider>
  )
}

export default More