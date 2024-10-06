import { MdOutlineLibraryAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { togglePlaylistmenu } from "../../store/authSlice";

const Menu = () => {
  const dispatch = useDispatch();
  return (
    <div className="option_box">
      <div
        className="api-container"
        onClick={() => dispatch(togglePlaylistmenu(true))}
      >
        <div className="icon">
          <MdOutlineLibraryAdd />
        </div>
        <div className="item">Save to Playlist</div>
      </div>
    </div>
  );
};

export default Menu;
