import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Nav() {
  const navigate = useNavigate();
  const [state, setstate] = useState("");
  const [first, setfirst] = useState(null);
  const [display, setdisplay] = useState("none");
  useEffect(() => {
    let v = JSON.parse(localStorage.getItem("userInfo"));
    let utype = v.utype;
    let i = v.userid;
    setstate(utype);
    setfirst(i);
    return () => {};
  }, []);

  const logout = () => {
    swal("Are you sure to LogOut?", {
      buttons: {
        cancel: "Let me back",
        sure: {
          text: "I'm sure",
          value: "sure",
        },
      },
    }).then((value) => {
      switch (value) {
        case "sure":
          swal("Successfully Logged Out!", "", "success").then((val) => {
            localStorage.removeItem("userInfo");
            return navigate("/login");
          });
          break;
        default:
          swal("Got away safely!", "", "success");
      }
    });
  };
  return (
    <div>
      <nav className="d-flex justify-content-between align-items-centre">
        <h6>
          Virtual Lobby
          <span style={{ color: "#73A9DF", fontSize: "34px" }}>.</span>
        </h6>
        <div className="nav-buttons">
          <button className="dashboard-btn" type="button" onClick={logout}>
            <i className="ri-user-3-fill"></i>
            Logout
          </button>
          {state === "U" ? (
            <div className="dropdown">
              <Link
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
                to={`/appointments/${first}`}
              >
                <i className="ri-calendar-fill"></i>
                Appointments
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="nav-menu-icon">
          <i
            style={{ cursor: "pointer" }}
            onClick={() => setdisplay("flex")}
            className="ri-menu-3-line"
          ></i>
          <div style={{ display: display }} className="menu-links">
            <i
              style={{ cursor: "pointer" }}
              onClick={() => setdisplay("none")}
              className="ri-close-line"
            ></i>
            <div className="dropdown">
              <button
                style={{ color: "#0E1F30" }}
                className="dashboard-btn"
                type="button"
                onClick={logout}
              >
                Logout
              </button>
            </div>
            {state === "U" ? (
              <div className="dropdown">
                <Link
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  to={`/appointments/${first}`}
                >
                  Appointments
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
