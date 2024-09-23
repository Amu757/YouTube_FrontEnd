import Option from "./Option"
import { TbTrendingUp } from "react-icons/tb";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoMusicalNoteOutline } from "react-icons/io5";
import { PiFilmSlateBold } from "react-icons/pi";
import { IoIosRadio } from "react-icons/io";
import { IoNewspaperOutline } from "react-icons/io5";
import { CiTrophy } from "react-icons/ci";
import { IoBulbOutline } from "react-icons/io5";
import { MdPodcasts } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import { IoStorefrontOutline } from "react-icons/io5";

function Explore() {
  return (
    <>
    <section className="navsection">
      <div className="title">
        <h4>Explore</h4>
      </div>
      <Option Icon={TbTrendingUp} navName="Trending" />
      <Option Icon={MdOutlineShoppingBag} navName="Shopping" />
      <Option Icon={IoMusicalNoteOutline} navName="Music" />
      <Option Icon={PiFilmSlateBold} navName="Films" />
      <Option Icon={IoIosRadio} navName="Live" />
      <Option Icon={IoGameControllerOutline} navName="Gaming" />
      <Option Icon={IoNewspaperOutline} navName="News" />
      <Option Icon={CiTrophy} navName="Sport" />
      <Option Icon={IoBulbOutline} navName="Courses" />
      <Option Icon={IoStorefrontOutline} navName="Fashion & beauty" />
      <Option Icon={MdPodcasts} navName="Podcasts" />
      <hr className="rular" />
    </section>
  </>
  )
}

export default Explore