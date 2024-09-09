import "./pages.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login as storelogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
// eslint-disable-next-line react/prop-types
function Password({ register }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <input
        type={show ? "text" : "password"}
        placeholder="Password"
        {...register("password", { required: true })}
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
      <div className="lastline">
        <button type="submit" className="nextbtn">
          Next
        </button>
      </div>
    </>
  );
}

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pagenum, setPagenum] = useState(1);

  const login = async (data) => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        console.log("error in login", error);
        alert(error.message);
        return;
      }

      const responsedata = await response.json();

      localStorage.setItem("accessToken", responsedata.data.accessToken);
      console.log("successful login: ", responsedata.data);
      const user_info = responsedata.data.user;
      if (user_info) dispatch(storelogin(user_info));
      // alert("Successful Login");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="form-page">
      <form className="form-container" onSubmit={handleSubmit(login)}>
        <div className="left">
          <div className="logo">
            <img src="/myimage.png" alt="logo image" />
          </div>
          <p className="heading">Sign in</p>
          <p className="">to continue to YouTube</p>
        </div>
        <div className="right">
          {pagenum === 1 ? (
            <>
              <input
                type="text"
                placeholder="Email"
                {...register("email", { required: true })}
              />
              <p>Not your computer? Use Guest mode to sign in privately.</p>
              <div className="lastline">
                <a href="">Create Account</a>
                <button
                  className="nextbtn"
                  onClick={() => setPagenum(pagenum + 1)}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <Password register={register} />
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
