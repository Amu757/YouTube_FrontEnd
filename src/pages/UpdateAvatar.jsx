import { useState } from "react";
import Loader from "../components/Loader/Loder";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import "../components/navigation/nav.css";
function UpdateAvatar() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const updateAvatar = async (data) => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    try {
      const formData = new FormData();
      formData.append("avatar", data.avatar[0]);
      console.log("pic ", data.avatar[0]);

      const response = await fetch(
        "http://localhost:8000/api/v1/users/avatar",
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("your response : ", response);
      if (!response.ok) {
        const error = await response.json();
        console.log("error in update avatar", error);
        alert(error.message);
        return;
      }

      const responsedata = await response.json();
      console.log("successful updated avatar: ", responsedata);

      setLoading(false);
      navigate("/");
      alert("Successful Updated Avatar");
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

  return (
    <div className="postmodal">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="closemodal">
            <IoMdCloseCircleOutline />
          </div>
          <div className="outer-container" id="mycontainer">
            <p>Change Your Avatar</p>
            <hr className="hr" />
            <form className="inputs" onSubmit={handleSubmit(updateAvatar)}>
              <div
                className="imgbox"
                style={{ height: "59vh", width: "18vw", marginLeft: "16vw" }}
              >
                <label
                  className="labelbox"
                  style={{ height: "47%", width: "100%" }}
                >
                  {image ? (
                    <img
                      src={image === "" ? null : image}
                      alt="image uploaded"
                    />
                  ) : (
                    <>
                      Avatar
                      <MdOutlineAddPhotoAlternate />
                    </>
                  )}
                  <input
                    type="file"
                    id="uploadImage"
                    accept="image/*"
                    {...register("avatar", {
                      required: true,
                      onChange: handleImageChange,
                    })}
                  />
                </label>
              </div>

              <button type="submit" className="sharebtn">
                Update
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default UpdateAvatar;
