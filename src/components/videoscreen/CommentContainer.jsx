import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

import "./style.css";
function CommentContainer({ commentId, picurl, username, content, time}) {
  const deleteComment = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/comment/c/${commentId}`,
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
        console.log("error in deleting comment ", error);
        alert(error.message);
        return;
      }

      const responsedata = await response.json();
      console.log("successful comment deleted  ", responsedata);
      alert("Comment deleted");
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
      <div className="right-part">
        <div className="topline">
          <p>{username}</p>
          <p>{time}</p>
        </div>
        <p>{content}</p>
        <div className="icons">
          <div>
            <BiLike />
          </div>
          <p>1.1</p>
          <div>
            <BiDislike />
          </div>
        </div>
      </div>
      <h5 onClick={deleteComment}>Delete</h5>
    </div>
  );
}

export default CommentContainer;
