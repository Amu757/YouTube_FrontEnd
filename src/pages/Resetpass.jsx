import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeNav } from "../store/authSlice";
import Loader from "../components/Loader/Loder";
import "./pages.css"
function Password({ register }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <input
        type={show ? "text" : "password"}
        placeholder="New Password"
        {...register("newPassword", { required: true })}
      />
      <input
        type={show ? "text" : "password"}
        placeholder="Confirm Password"
        {...register("confirmPassword", { required: true })}
      />

      <div className="checkboxdiv">
        <input
          id="showpass"
          type="checkbox"
          value="showpassword"
          onClick={() => setShow(!show)}
        />
        <label>Show Password</label>
      </div>
    </>
  );
}

function Resetpass({setActiveOption}) {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const resetPassword = async (data) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/change-password",
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
        console.log("error in Reset password", error);
        alert(error.message);
        return;
      }

      const responsedata = await response.json();

      localStorage.setItem("accessToken", responsedata.data.accessToken);
      console.log("successful password reset: ");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="form-page">
          <h1 className="closewindow" onClick={()=>{setActiveOption("Home"); dispatch(changeNav("Home"))}}>x</h1>
          <form
            className="form-container"
            onSubmit={handleSubmit(resetPassword)}
          >
            <div className="left">
              <div className="logo">
                <img src="/myimage.png" alt="logo image" />
              </div>
              <p className="heading">Reset Password</p>
              <p className="">keep your account safe</p>
            </div>
            <div className="right">
              <>
                <input
                  type="text"
                  placeholder="Old password"
                  {...register("oldPassword", { required: true })}
                />
                <Password register={register} />
                <div className="lastline">
                  <button type="submit" className="nextbtn">
                    Submit
                  </button>
                </div>
              </>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Resetpass;
