import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircleOutline } from "react-icons/io5";
import { togglePlaylistmenu } from "../../store/authSlice";
import PlaylistForm from "./PlaylistForm";

const ListNames = () => {
  const dispatch = useDispatch();
  const [showoption, setShowoption] = useState(false);
  const [oldLists, setOldLists] = useState([]);
  const playlistsarr = useSelector((state)=> state.auth.allPlaylists)

  useEffect(() => {
    if (playlistsarr) setOldLists(playlistsarr);
  }, [playlistsarr, oldLists]);

  
  return (
    <div className="list-box_">
      <div className="top_">
        Save video to..
        <p
          className="closelist"
          onClick={() => dispatch(togglePlaylistmenu(false))}
        >
          X
        </p>
      </div>
      <div className="middle_">
        {oldLists && oldLists.length !== 0 ? (
          oldLists.map((listitem) => (
            <div key={listitem._id}>{listitem.name}</div>
          ))
        ) : (
          <div>create new list</div>
        )}
      </div>
      <div className="bottom_">
        {showoption ? (
          <PlaylistForm
            setOldLists={setOldLists}
            setShowoption={setShowoption}
          />
        ) : (
          <>
            <div>
              <IoAddCircleOutline />
            </div>
            <p onClick={() => setShowoption(true)}>Create a new playlist</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ListNames;
