import { useState } from "react";
import "./pages.css";

function Name({ setPagenum, pagenum }) {
  return (
    <>
      <input type="text" placeholder="First name" />
      <input type="text" placeholder="Surname (optional)" />
      <p>Do you have a account? plase click to sign in</p>
      <div className="lastline">
        <a href="">Go to Sign in</a>
        <button className="nextbtn" onClick={() => setPagenum(pagenum + 1)}>
          Next
        </button>
      </div>
    </>
  );
}

function Bday({ setPagenum, pagenum }) {
  return (
    <>
      <div className="firstrow">
        <input type="text" placeholder="Day" />
        <input type="text" placeholder="Month" />
        <input type="text" placeholder="Year" />
      </div>
      <select>
        <option>Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <div className="lastline">
        <button className="nextbtn" onClick={() => setPagenum(pagenum + 1)}>
          Next
        </button>
      </div>
    </>
  );
}

function Email({ setPagenum, pagenum }) {
  return (
    <>
      <input type="text" placeholder="Enter a Email address" />
      <p>You can use letters, numbers and underscore</p>
      <div className="lastline">
        <button className="nextbtn" onClick={() => setPagenum(pagenum + 1)}>
          Next
        </button>
      </div>
    </>
  );
}

function Password() {
  return (
    <>
      <input type="text" placeholder="Password" />
      <input type="text" placeholder="Confirm" />
      <input type="checkbox">Show password</input>
      <div className="lastline">
        <button className="nextbtn" onClick={() => setPagenum(pagenum + 1)}>
          Next
        </button>
      </div>
    </>
  );
}

function Lefttext({ heading, instruction }) {
  return (
    <>
      <p className="heading">{heading}</p>
      <p className="">{instruction}</p>
    </>
  );
}

function Signup() {
  const [pagenum, setPagenum] = useState(1);
  return (
    <div className="form-page">
      <form className="form-container">
        <div className="left">
          <div className="logo">
            <img src="/myimage.png" alt="logo" />
          </div>
          {pagenum === 1 ? (
            <Lefttext
              heading="Create a YouTube Account"
              instruction="Enter Your Name"
            />
          ) : pagenum === 2 ? (
            <Lefttext
              heading="Basic information"
              instruction="Enter your birthday and gender"
            />
          ) : pagenum === 3 ? (
            <Lefttext
              heading="Choose your Gmail address"
              instruction="Pick a Gmail address or create your own"
            />
          ) : pagenum === 4 ? (
            <Lefttext
              heading="Create a strong password"
              instruction="Create a strong password with a mixture of letters, numbers and underscore"
            />
          ) : null}
        </div>
        <div className="right signup_right">
          {pagenum === 1 ? (
            <Name setPagenum={setPagenum} pagenum={pagenum} />
          ) : pagenum === 2 ? (
            <Bday setPagenum={setPagenum} pagenum={pagenum} />
          ) : pagenum === 3 ? (
            <Email setPagenum={setPagenum} pagenum={pagenum} />
          ) : pagenum === 4 ? (
            <Password setPagenum={setPagenum} pagenum={pagenum}/>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default Signup;
