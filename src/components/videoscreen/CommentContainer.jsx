/* eslint-disable react/prop-types */
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
// import { FaRegThumbsDown } from "react-icons/fa";
// import { FaThumbsDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import "./style.css";
import { useSelector } from "react-redux";
function CommentContainer({
  commentId,
  picurl,
  username,
  userid,
  content,
  time,
  refresh,
}) {
  const [likedstatus, setLikedstatus] = useState(false);
  const [totallikes, setTotalLikes] = useState(0);
  // const [disliked, setDisliked] = useState(false);
  const [editmode, setEditmode] = useState(false);
  const [newComment, setNewComment] = useState(content);
  const currentUserId = useSelector((state) => state.auth.data?._id);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    getlikes();
    switch (totallikes) {
      case totallikes > 999:
        setTotalLikes("1 K");
        break;
      case totallikes > 9999:
        setTotalLikes("10 K");
        break;
    }
  }, []);

  useEffect(() => {
    setValue("newcontent", newComment);
  }, [newComment]);

  const getlikes = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/like/c/${commentId}`,
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
        console.log("error in fetching comment likes ", error);
        alert(error.message);
        return;
      }

      const responsedata = await response.json();
      console.log("successfuly comment likes fetched ", responsedata);
      setTotalLikes(responsedata.data.commentlikes.length);
      setLikedstatus(responsedata.data.userpresent);
    } catch (error) {
      console.log(error);
    }
  };

  const handlChange = (value) => {
    setNewComment(value);
  };

  const editComment = async (data) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/comment/c/${commentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("error in updating comment ", error);
        alert(error.message);
        return;
      }

      const responsedata = await response.json();
      console.log("successful comment updated  ", responsedata);
      setEditmode(false);
      refresh();
      alert("Comment updated");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/comment/c/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("error in deleting comment ", error);
        alert(error.message);
        return;
      }

      const responsedata = await response.json();
      console.log("successful comment deleted  ", responsedata);

      refresh();
      alert("Comment deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handlelike = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/like/toggle/c/${commentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log("error in toggle comment like", error);
        alert(error.message);
        return;
      }

      const responsedata = await response.json();

      console.log("successful comment like is togged: ", responsedata);

      getlikes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="outerbox">
      <div className="left-part">
        <div className="propic">
          <img src={picurl} alt="propic" />
        </div>
      </div>
      <form className="right-part" onSubmit={handleSubmit(editComment)}>
        <div className="topline">
          <p>{username}</p>
          <p>{time}</p>
        </div>
        {editmode ? (
          <input
            className="editcommentinput"
            value={newComment}
            {...register("newcontent")}
            onChange={(e) => handlChange(e.target.value)}
          />
        ) : (
          <p>{content}</p>
        )}
        <div className="icons">
          <div onClick={getlikes}>
            {likedstatus ? <FaThumbsUp fill="green" /> : <FaRegThumbsUp />}
          </div>
          <p>{totallikes}</p>
          {/* <div onClick={() => handlelike(false)}>
            {disliked ? <FaThumbsDown fill="red" /> : <FaRegThumbsDown />}
          </div> */}
        </div>
      </form>
      {userid === currentUserId ? (
        <h5 className="editicon" onClick={() => setEditmode(!editmode)}>
          <CiEdit />
        </h5>
      ) : null}
      <h5 onClick={deleteComment}>Delete</h5>
    </div>
  );
}

export default CommentContainer;
