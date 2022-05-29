import Axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import swal from "sweetalert";


function Login() {
  const [loading, setloading] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [tripType, setTripType] = useState("U");

  const navigate = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setloading(true);
    Axios.post(
      "http://localhost:8080/login",
      {
        username: email,
        password: password,
        utype: tripType
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(async (response) => {
      console.log(response)
      if(response.data.status === true){
        await swal("Logged in successfully","","success")
        localStorage.setItem("userInfo",JSON.stringify(response.data.data))
        setloading(false)
        navigate('/dashboard')
      }
      else{
        setloading(false)
        return swal("Incorrect username or password","","info")
      }
    })
    .catch(async (err) => {
      if (err.response) {
      // client received an error response (5xx, 4xx)
      setloading(false);
      if (err.response.status >= 400 && err.response.status <= 499)
        return swal(
          "Uh-oh.",
          "something was not right on your end, please try again",
          "info"
        );
      else if (
        err.response.status >= 500 &&
        err.response.status <= 599
      )
        return swal(
          "Uh-oh..Error 500",
          "Something went wrong at our end. Sorry about that",
          "info"
        );
    } else if (err.request) {
      // client never received a response, or request never left
      setloading(false);
      return swal(
        "Network error",
        "The network connection is lost,please try after some time",
        "info"
      );
    } else {
      // anything else
      console.log(err);
      setloading(false);
      return swal("something went wrong", "", "info");
    }});
  };
  return (
    <div className="login-parent">
      <div id="image-section">
        <div id="overlay">
          <h6 className="mb-5">
            Virtual Lobby
            <span style={{ color: "#73A9DF", fontSize: "34px" }}>.</span>
          </h6>
          <h1>
            A Platform for scheduling{" "}
            <span style={{ color: "#73A9DF" }}>hassle-free</span> appointments
            <span style={{ color: "#73A9DF", fontSize: "34px" }}>.</span>
          </h1>
        </div>
      </div>
      <div id="form-section">
        <div id="form-body">
          <h2>Log In</h2>
          <p className="mb-4">
            Welcome back! <br />
            Enter your details to login to your account.
          </p>
          <form onSubmit={onSubmitHandler} action="">
            <div className="mb-4">
              <label className="form-label">Email address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                className="form-control"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-4 position-relative">
              <label className="form-label">Password</label>
              <div
                onClick={() => setshowPassword(!showPassword)}
                className="position-absolute top-0 end-0 utility"
              >
                {showPassword ? (
                  <i className="ri-eye-line"></i>
                ) : (
                  <i className="ri-eye-close-line"></i>
                )}
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>
            <div className="form-check mb-5">
            <div
                    onClick={() => {
                      setTripType("U");
                    }}
                    className="form-check form-check-inline"
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tripType"
                      id="inlineRadio1"
                      value={tripType}
                      checked={tripType === "U"}
                      readOnly
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      Customer
                    </label>
                  </div>
                  <div
                    onClick={() => {
                      setTripType("S");
                    }}
                    className="form-check form-check-inline"
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tripType"
                      id="inlineRadio2"
                      value={tripType}
                      checked={tripType === "S"}
                      readOnly
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      Shop/Business Owner
                    </label>
                  </div>
            </div>
            <button type="submit" className="mb-5">
              {loading ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Log In"
              )}
            </button>
            <Link to="/register">
              Don't have an account?{" "}
              <span style={{ color: "#73A9DF" }}> Signup </span>{" "}
            </Link>
            <Link
              style={{ display: "inline-block", textDecoration: "underline" }}
              to="/"
            >
              Back to home
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
