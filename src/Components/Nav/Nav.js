import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import swal from 'sweetalert';

function Nav() {
  const navigate = useNavigate()
  const [state, setstate] = useState('')
  useEffect(() => {
    let v = JSON.parse(localStorage.getItem('userInfo'))
    let utype = v.utype;
    setstate(utype)
    return () => {
    }
  }, [])
  
console.log(state)
  const logout = ()=>{
    swal("Are you sure to LogOut?",{
      buttons : {
        cancel : "Let me back",
        sure: {
          text : "I'm sure",
          value : "sure"
        },
      },
    }).then((value)=>{
      switch(value){
        case "sure" : 
        swal("Successfully Logged Out!","","success").then((val)=>{
          localStorage.removeItem("userInfo");
          return navigate("/login")
        });
        break;
        default:
          swal("Got away safely!","","success")
      }
    })
  }
  return (
    <div>
        <nav className="d-flex justify-content-between align-items-centre">
        <h6>
          Virtual Lobby
          <span style={{ color: "#73A9DF", fontSize: "34px" }}>.</span>
        </h6>
        <div className="nav-buttons">
          <div className="dropdown">
            <button
              className="dashboard-btn"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="ri-user-3-fill"></i>
              Profile
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <button onClick={logout} className="dropdown-item custom-drop-btn" href="/">
                  Logout
                </button>
              </li>
            </ul>
          </div>
          {state === 'U'?<div className="dropdown">
            <Link
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
              to="/appointments/:id"
            >
              <i className="ri-calendar-fill"></i>
              Appointments
            </Link>
          </div> : ''}
        </div>
      </nav>
    </div>
  )
}

export default Nav