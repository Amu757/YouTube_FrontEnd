/* eslint-disable react/prop-types */
import { CgCloseO } from "react-icons/cg";
import { changeNav } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { PiShareFatThin } from "react-icons/pi";
import { TfiDownload } from "react-icons/tfi";
import Loader from "../Loader/Loder";
import CommentContainer from "./CommentContainer";
import { useEffect, useState } from "react";
import "./style.css";

function Fullscreen({ video, videoId }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/comment/${videoId}?page=1&limit=10`,
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
        console.log("error in fetching comments ", error);
        alert(error.message);
        return;
      }

      const responsedata = await response.json();
      console.log("successfuly comment fetched ", responsedata);
      setUserData(responsedata.data.userdata);
      setComments(responsedata.data.comments);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async (data) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/comment/${videoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("error in posting comment ", error);
        alert(error.message);
        return;
      }

      const responsedata = await response.json();
      console.log("successful comment post ", responsedata);
      clearInput();
      alert("Comment added");
    } catch (error) {
      console.log(error);
    }
  };

  const clearInput = () => {
    window.document.getElementById("content").value = "";
  };
  return (
    <div className="fullscreen">
      <div className="videobox">
        <video controls autoPlay>
          <source src={video} type="video/mp4" />
        </video>

        <div className="close" onClick={() => dispatch(changeNav("Home"))}>
          <CgCloseO />
        </div>
      </div>

      <div className="bottomcontent">
        <p className="titlebox">
          title of video bla bla bla | video is important for you
        </p>
        <div className="firstrow">
          <div className="leftside">
            <div className="profilepic">
              <img src="" alt="propic" />
            </div>
            <div>
              <p className="boldname">Channel name</p>
              <p className="">10k subscribers </p>
            </div>
            <button className="subscribeBtn">Subscribe</button>
          </div>
          <div className="btnsGroup">
            <button>
              <BiLike /> 424 | <BiDislike />
            </button>
            <button>
              <PiShareFatThin /> Share
            </button>
            <button>
              <TfiDownload /> Download
            </button>
            <button>...</button>
          </div>
        </div>
        <div className="secondrow">
          <p>223 views 4years ago</p>
          <p>description of the video links and other information</p>
        </div>
        <div className="comments">
          <h3>3232 comments</h3>
          <form className="mycomment" onSubmit={handleSubmit(postComment)}>
            <div className="profilepic">
              <img src="" alt="propic" />
            </div>
            <input
              id="content"
              type="text"
              placeholder="Add your comment..."
              {...register("content")}
            />
            <div className="btnbox">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  clearInput();
                }}
              >
                Cancel
              </button>
              <button type="submit">Comment</button>
            </div>
          </form>
          <div className="commentsbox">
            {loading ? (
              <Loader />
            ) : comments && comments.length !== 0 ? (
              comments.map((comment, index) => {
                let user = userData[index];
                return (
                  <CommentContainer
                    key={comment._id}
                    commentId={comment._id}
                    picurl={user.avatar}
                    username={user.userName}
                    content={comment.content}
                    time={comment.updatedAt}
                  />
                );
              })
            ) : (
              <p>No comments found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fullscreen;
