import "./pages.css";

function Login() {
  return (
    <div className="form-page">
      <form className="form-container">
        <div className="left">
          <div className="logo">
            <img src="/myimage.png" alt="logo image" />
          </div>
          <p className="heading">Sign in</p>
          <p className="">to continue to YouTube</p>
        </div>
        <div className="right">
            <input type="text" placeholder="Email or phone" />
            <p>Not your computer? Use Guest mode to sign in privately.</p>
            <div className="lastline">
                <a href="">Create Account</a>
                <button className="nextbtn">Next</button>
            </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
