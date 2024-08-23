import Option from "./Option"
import { TbTrendingUp } from "react-icons/tb";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoMusicalNoteOutline } from "react-icons/io5";
import { PiFilmSlateBold } from "react-icons/pi";
import { IoIosRadio } from "react-icons/io";
import { SiYoutubegaming } from "react-icons/si";
import { IoNewspaperOutline } from "react-icons/io5";
import { CiTrophy } from "react-icons/ci";
import { IoBulbOutline } from "react-icons/io5";
import { FaStoreAlt } from "react-icons/fa";
import { MdPodcasts } from "react-icons/md";

function Explore() {
  return (
    <>
    <section className="navsection">
      <div className="title">
        <h4>Explore</h4>
      </div>
      <Option Icon={TbTrendingUp} item="Trending" />
      <Option Icon={MdOutlineShoppingBag} item="Shopping" />
      <Option Icon={IoMusicalNoteOutline} item="Music" />
      <Option Icon={PiFilmSlateBold} item="Films" />
      <Option Icon={IoIosRadio} item="Live" />
      <Option Icon={SiYoutubegaming} item="Gaming" />
      <Option Icon={IoNewspaperOutline} item="News" />
      <Option Icon={CiTrophy} item="Sport" />
      <Option Icon={IoBulbOutline} item="Courses" />
      <Option Icon={FaStoreAlt} item="Fashion & beauty" />
      <Option Icon={MdPodcasts} item="Podcasts" />
      <hr className="rular" />
    </section>
  </>
  )
}

export default Explore