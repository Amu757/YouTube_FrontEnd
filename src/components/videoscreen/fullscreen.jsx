/* eslint-disable react/prop-types */
import { CgCloseO } from "react-icons/cg";
import { changeNav } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { PiShareFatThin } from "react-icons/pi";
import { TfiDownload } from "react-icons/tfi";
import Loader from "../Loader/Loder";
import CommentContainer from "./CommentContainer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./style.css";

function Fullscreen({ video_info, compareDate }) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [comments, setComments] = useState([]);
  const [userData, setUserData] = useState([]);
  const [subsriberCount, setSubsriberCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [likedtatus, setLikedstatus] = useState(false);
  const [totallikes, setTotalLikes] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [dislikestatus, setDislikestatus] = useState(false);
  let profilepic = useSelector((state) => state.auth.data?.avatar);
  console.log("my video info ", video_info);
  const { title, description, videoFile, view, videoId, createdAt, userinfo } =
    video_info;

  useEffect(() => {
    getlikes();
    getsubscribedStatus();
    totalSubscribers();
    getComments();
    updateViews();
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
      getComments();
      alert("Comment added");
    } catch (error) {
      console.log(error);
    }
  };

  const totalSubscribers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:8000/api/v1/subscription/u/${userinfo._id}`,
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
        console.log("error feching subscribers", error);
        alert("error feching subscribers");
        return;
      }

      const responsedata = await response.json();
      console.log("subscribers ", responsedata);
      let totalsub = responsedata.data.length;
      switch (totalsub) {
        case totalsub > 999:
          setSubsriberCount("1 k");
          break;
        case totalsub > 9999:
          setSubsriberCount("10 k");
          break;
        default:
          setSubsriberCount(totalsub);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEnterkey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const myinput = window.document.getElementById("content");
      myinput.value = `${myinput.value}`;
    }
  };

  const clearInput = () => {
    window.document.getElementById("content").value = "";
  };

  const handlelike = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/like/toggle/v/${videoId}`,
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
        console.log("error in toggle video likes ", error);
        alert(error.message);
        return;
      }

      const responsedata = await response.json();
      console.log("successfuly video likes togelled ", responsedata);
      getlikes();
    } catch (error) {
      console.log(error);
    }
  };
  const getlikes = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/like/v/${videoId}`,
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
      console.log("successfuly video likes fetched ", responsedata);
      setTotalLikes(responsedata.data.videolikes.length);
      setLikedstatus(responsedata.data.userpresent);
    } catch (error) {
      console.log(error);
    }
  };
  const getsubscribedStatus = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/subscription/status/c/${userinfo._id}`,
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
        console.log("error in fetching subscribed status ", error);
        alert(error.message);
        return;
      }

      const responsedata = await response.json();
      console.log("successfuly fetched subscribed status ", responsedata);
      setSubscribed(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getTogglesubscription = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/subscription/c/${userinfo._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("error in toggle subscription ", error);
        alert(error.message);
        return;
      }

      const responsedata = await response.json();
      console.log("successfuly toggle subscription ", responsedata);
      setSubscribed(!subscribed);
    } catch (error) {
      console.log(error);
    }
  };

  const updateViews = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/video/views/${videoId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("error in updating video views ", error);
        alert(error.message);
        return;
      }

      const responsedata = await response.json();
      console.log("successfuly video views updated", responsedata);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fullscreen">
      <div className="videobox">
        <video controls autoPlay>
          <source src={videoFile} type="video/mp4" />
        </video>

        <div className="close" onClick={() => dispatch(changeNav("Home"))}>
          <CgCloseO />
        </div>
      </div>

      <div className="bottomcontent">
        <p className="titlebox">{title}</p>
        <div className="firstrow">
          <div className="leftside">
            <div
              className="profilepic"
              onClick={() => dispatch(changeNav("profilepage"))}
            >
              <img src={userinfo.avatar} alt="propic" />
            </div>
            <div>
              <p
                className="boldname"
                onClick={() => dispatch(changeNav("profilepage"))}
              >
                {userinfo.userName}
              </p>
              <p>{subsriberCount} subscribers </p>
            </div>
            <button
              className={subscribed ? "unsubscribe" : "subscribeBtn"}
              onClick={getTogglesubscription}
            >
              {subscribed ? "Unsubscribed" : "Subscribe"}
            </button>
          </div>
          <div className="btnsGroup">
            <button onClick={handlelike}>
              {likedtatus ? <FaThumbsUp fill="green" /> : <FaRegThumbsUp />}{" "}
              <b>{totallikes}</b> |
              {dislikestatus ? (
                <FaThumbsDown fill="red" />
              ) : (
                <FaRegThumbsDown />
              )}
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
          <p>
            {view} views {compareDate(createdAt)}
          </p>
          <p>{description}</p>
        </div>
        <div className="comments">
          <h3>{comments?.length} comments</h3>
          <form
            className="mycomment"
            onSubmit={handleSubmit(postComment)}
            onKeyDown={handleEnterkey}
          >
            <div className="profilepic">
              <img src={profilepic} alt="mypic" />
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
                const timeago = compareDate(comment.updatedAt);
                return (
                  <CommentContainer
                    key={comment._id}
                    commentId={comment._id}
                    picurl={user.avatar}
                    username={user.userName}
                    userid={user._id}
                    content={comment.content}
                    time={timeago}
                    refresh={getComments}
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
