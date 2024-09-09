import Option from "./Option";
import { BiSolidUserPin } from "react-icons/bi";
import { LuHistory } from "react-icons/lu";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { GoVideo } from "react-icons/go";
import { IoIosTimer } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { GoDownload } from "react-icons/go";
import { IoMdAddCircleOutline } from "react-icons/io";

function You() {
  return (
    <>
      <section className="navsection youheight">
        <div className="title">
          <h4>You</h4>
        </div>
        
        <Option Icon={IoMdAddCircleOutline} item="Add Video" />
        <Option Icon={BiSolidUserPin} item="Your Channel" />
        <Option Icon={LuHistory} item="History" />
        <Option Icon={MdOutlinePlaylistPlay} item="Playlists" />
        <Option Icon={GoVideo} item="Your Videos" />
        <Option Icon={IoIosTimer} item="Watch Later" />
        <Option Icon={AiOutlineLike} item="Liked Videos" />
        <Option Icon={GoDownload} item="Downloads" />
        <hr className="rular" />
      </section>
    </>
  );
}

export default You;
