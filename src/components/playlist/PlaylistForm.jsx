/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

function PlaylistForm({ setOldLists, setShowoption }) {
  const userid = useSelector((state) => state.auth.data?._id);
  const { register, handleSubmit, reset } = useForm();

  const handleClick = async (data) => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch("http://localhost:8000/api/v1/playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        console.log("error in creating playlist", error);
        alert(error.message);
        return;
      }

      const responsedata = await response.json();

      console.log("successful palylist created: ", responsedata.data);
      getExistinglists();
      setShowoption(false);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const getExistinglists = async () => {
    console.log("get list names", userid);
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/playlist/user/${userid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log("error in getting playlist", error);
        alert(error.message);
        return;
      }

      const responsedata = await response.json();

      console.log("successful palylist fetched: ", responsedata.data);

      setOldLists(responsedata.data);
    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <form onSubmit={handleSubmit(handleClick)}>
      <input type="text" placeholder="Name of Playlist" {...register("name")} />
      <input
        type="text"
        placeholder="Description.."
        {...register("description")}
      />
      <div className="btns">
        <button
          type="button"
          onClick={() => {
            reset();
            setShowoption(false);
          }}
        >
          Cancel
        </button>
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default PlaylistForm;
