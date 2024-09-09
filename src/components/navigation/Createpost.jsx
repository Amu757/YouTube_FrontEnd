import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { CiVideoOn } from "react-icons/ci";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import Loader from "../Loader/Loder";

import "./createpost.css";

export let callShowPosts = true;

function PostForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [gotvideo, setGotvideo] = useState(false);
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const addvideo = async (data) => {
    console.log("inside add video");
    setIsLoading(true);
    const token = localStorage.getItem("accessToken")
    try {
      const formData = new FormData();
      formData.append("videoFile", data.videoFile[0]);
      formData.append("thumbnail", data.thumbnail[0]);
      formData.append("title",data.title)
      formData.append("description",data.description)
      // formData.append(
      //   "other",
      //   JSON.stringify({
      //     title: data.title,
      //     description: data.description,
      //   })
      // );
      console.log("your data ", data);

      try {
        const response = await fetch("http://localhost:8000/api/v1/video", {
          method: "POST",
          body: formData,
          headers: {
            "Cookie": `accessToken=${token}`,
            "Authorization": `Bearer ${token}`,
          },
          // credentials: 'include',  //includes cookies but in backend you need to change the cors * wild card entry
        });
        console.log("your response : ", response);
        if (!response.ok) {
          const error = await response.json();
          console.log("error in video upload", error);
          alert(error.message);
          return;
        }

        const responsedata = await response.json();
        console.log("successful video posting: ", responsedata);

        setIsLoading(false);
        navigate("/");
        alert("Successful Video Post");
      } catch (error) {
        console.log(error);
        // setError(error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = async (event) => {
    const selectedImage = event.target.files[0];
    event.target.placeholder = null;
    setImage(URL.createObjectURL(selectedImage));
    console.log("image got");
  };

  const closeit = () => {
    navigate("/");
  };
  return (
    // <>
    <div className="postmodal">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="closemodal" onClick={closeit}>
            <IoMdCloseCircleOutline />
          </div>
          <div className="outer-container" id="mycontainer">
            <p>Post Your Video</p>
            <hr className="hr" />
            <form className="inputs" onSubmit={handleSubmit(addvideo)}>
              <div className="imgbox">
                <label className="labelbox">
                  {gotvideo ? "" : "Video"}
                  <input
                    type="file"
                    id="uploadImage"
                    accept="video/*"
                    {...register("videoFile", {
                      required: true,
                      onChange: () => {
                        setGotvideo(true);
                      },
                    })}
                  />
                  {gotvideo ? <IoCheckmarkDoneCircleOutline /> : <CiVideoOn />}
                </label>
                <label className="labelbox">
                  {image ? (
                    <img
                      src={image === "" ? null : image}
                      alt="image uploaded"
                    />
                  ) : (
                    <>
                      Thumnail
                      <MdOutlineAddPhotoAlternate />
                    </>
                  )}
                  <input
                    type="file"
                    id="uploadImage"
                    accept="image/*"
                    {...register("thumbnail", {
                      required: true,
                      onChange: handleImageChange,
                    })}
                  />
                </label>
              </div>

              <div className="postmessagebox">
                <label className="mytitle">
                  <input
                    id="imgCaption"
                    type="text"
                    placeholder="Write a Title"
                    {...register("title")}
                  />
                </label>
                <label htmlFor="imgCaption" className="desc">
                  <input
                    id="imgCaption"
                    placeholder="Write a Description.."
                    {...register("description", { required: true })}
                  />
                </label>
              </div>
              <button type="submit" className="sharebtn">
                Share
              </button>
            </form>
          </div>
        </>
      )}
    </div>

    // </>
  );
}

export default PostForm;
