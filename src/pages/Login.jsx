import "./pages.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
  const [pagenum, setPagenum] = useState(1);
  const login = (data) => {
    console.log("my login details: ", data);
    navigate("/");
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
                placeholder="Email or phone"
                {...register("username", { required: true })}
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
