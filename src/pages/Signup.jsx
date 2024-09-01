/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./pages.css";

function Name({ setPagenum, pagenum, register }) {
  return (
    <>
      <input
        type="text"
        placeholder="Enter your Full Name"
        {...register("fullName", { required: true })}
      />
      <input
        type="text"
        placeholder="Enter a User Name"
        {...register("userName", { required: true })}
      />
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

function Bday({ setPagenum, pagenum, register }) {
  return (
    <>
      <div className="firstrow">
        <input type="text" placeholder="Day" {...register("day")} />
        <input type="text" placeholder="Month" {...register("month")} />
        <input type="text" placeholder="Year" {...register("year")} />
      </div>
      <select {...register("gender")}>
        <option value="Gender">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="other">Other</option>
      </select>
      <div className="lastline">
        <button className="nextbtn" onClick={() => setPagenum(pagenum + 1)}>
          Next
        </button>
      </div>
    </>
  );
}

function Email({ setPagenum, pagenum, register }) {
  return (
    <>
      <input
        type="text"
        placeholder="Enter a Email address"
        {...register("email", { required: true })}
      />
      <p>You can use letters, numbers and underscore</p>
      <div className="lastline">
        <button className="nextbtn" onClick={() => setPagenum(pagenum + 1)}>
          Next
        </button>
      </div>
    </>
  );
}
function File({ setPagenum, pagenum, register }) {
  let gotavatar = false,
    gotcover = false;
  const go = () => {
    if (gotavatar && gotcover) {
      setPagenum(pagenum + 1);
    } else {
      alert("All fields are necessory");
    }
  };
  return (
    <>
      <label>Please upload an avatar:</label>
      <input
        type="file"
        placeholder="Please upload a avatar"
        {...register("avatar")}
        onChange={() => (gotavatar = true)}
      />
      <label>Please upload an coverImage:</label>
      <input
        type="file"
        placeholder="Upload a cover image"
        {...register("coverImage")}
        onChange={() => (gotcover = true)}
      />
      <div className="lastline">
        <button className="nextbtn" onClick={() => go()}>
          Next
        </button>
      </div>
    </>
  );
}

function Password({ register, setCpass, setPass, cpass, pass }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <input
        type={show ? "text" : "password"}
        placeholder="Password"
        {...register("password", { required: true })}
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <input
        type={show ? "text" : "password"}
        placeholder="Confirm"
        value={cpass}
        onChange={(e) => setCpass(e.target.value)}
      />
      <div className="checkboxdiv">
        <input id="showpass" type="checkbox" onClick={() => setShow(!show)} />
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
  const { register, handleSubmit } = useForm();
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");

  const create = async (data) => {
    try {
      if (cpass !== "" && cpass === pass) {
        console.log("Password is excepted");
      } else {
        console.log("Password should be maching, ERROR!");
        alert("Password should be maching, ERROR!");
      }

      console.log("your form data is : ", data);

      const formData = new FormData();
      formData.append("avatar", data.avatar[0]); // Add the file to the FormData object
      formData.append("coverImage", data.coverImage[0]);

      formData.append(
        "userinfo",
        JSON.stringify({
          fullName: data.fullName,
          userName: data.userName,
          day: data.day,
          month: data.month,
          year: data.year,
          gender: data.gender,
          email: data.email,
          password: data.password,
        })
      );

      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/users/register",
          {
            method: "POST",
            body: formData,
          }
        );
        console.log("your response : ", response);
        if (!response.ok) {
          const error = await response.json();
          console.log("error in signup", error);
          alert(error.message)
          return;
        }

        const responsedata = await response.json();
        console.log("successful signup: ", responsedata);
        alert("Successful Registration");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-page">
      <form className="form-container" onSubmit={handleSubmit(create)}>
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
              heading="Import your Avatar & CoverImage"
              instruction="Show your Avatar and Cover Image "
            />
          ) : pagenum === 4 ? (
            <Lefttext
              heading="Choose your Gmail address"
              instruction="Pick a Gmail address or create your own"
            />
          ) : pagenum === 5 ? (
            <Lefttext
              heading="Create a strong password"
              instruction="Create a strong password with a mixture of letters/numbers/underscore"
            />
          ) : null}
        </div>
        <div className="right signup_right">
          {pagenum === 1 ? (
            <Name
              setPagenum={setPagenum}
              pagenum={pagenum}
              register={register}
            />
          ) : pagenum === 2 ? (
            <Bday
              setPagenum={setPagenum}
              pagenum={pagenum}
              register={register}
            />
          ) : pagenum === 3 ? (
            <File
              setPagenum={setPagenum}
              pagenum={pagenum}
              register={register}
            />
          ) : pagenum === 4 ? (
            <Email
              setPagenum={setPagenum}
              pagenum={pagenum}
              register={register}
            />
          ) : pagenum === 5 ? (
            <Password
              register={register}
              setPass={setPass}
              setCpass={setCpass}
              pass={pass}
              cpass={cpass}
            />
          ) : (
            <p>Thanks for the data</p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Signup;
