import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login, changeNav } from "../store/authSlice";
import Loader from "../components/Loader/Loder";

import "./pages.css";
import { useState } from "react";
function Updateuser() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const updateinfo = async (data) => {
    const token = localStorage.getItem("accessToken");
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/update-account",
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
        console.log("error in update user data", error);
        alert("error in fetching update user");
        return;
      }

      const responsedata = await response.json();
      console.log("res: ", response);
      const user_info = responsedata.data;
      console.log("data: ", user_info);
      dispatch(login(user_info));
      dispatch(changeNav("Home"));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-page">
      {loading ? (
        <Loader />
      ) : (
        <form
          className="form-container updateuserbox"
          onSubmit={handleSubmit(updateinfo)}
        >
          <h3>Update Account Information</h3>
          <input
            type="text"
            placeholder="Enter your Full Name"
            {...register("fullName", { required: true })}
          />
          <input
            type="text"
            placeholder="Enter your Email"
            {...register("email", { required: true })}
          />

          <button type="submit" className="nextbtn">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default Updateuser;
