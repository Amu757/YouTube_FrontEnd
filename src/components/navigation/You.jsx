import Option from "./Option";
import { LuHistory } from "react-icons/lu";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { GoVideo } from "react-icons/go";
import { IoIosTimer } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { GoDownload } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

function You() {
  return (
    <>
      <section className="navsection youheight">
        <div className="title">
          <h4>You</h4>
        </div>

        <Option Icon={IoMdAddCircleOutline} navName="Add Video" />
        <Option Icon={FaRegUser} navName="Your Channel" />
        <Option Icon={LuHistory} navName="History" />
        <Option
          Icon={MdOutlinePlaylistPlay}
          navName="Playlists"
                  />
        <Option Icon={GoVideo} navName="Your Videos" />
        <Option Icon={IoIosTimer} navName="Watch Later"  />
        <Option Icon={AiOutlineLike} navName="Liked Videos"/>
        <Option Icon={GoDownload} navName="Downloads" />
        <hr className="rular" />
      </section>
    </>
  );
}

export default You;
