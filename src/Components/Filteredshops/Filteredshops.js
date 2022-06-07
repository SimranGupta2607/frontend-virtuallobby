import React, { useEffect, useState } from "react";
import "./Filteredshops.css";
import { useParams } from "react-router-dom";
import Nav from "../Nav/Nav.js";
import Footer from "../Footer/Footer.js";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from 'react-router-dom';


function Filteredshops() {
  const [shoplist, setshoplist] = useState(null);
  const [display, setDisplay] = useState("none");
  const [timeslot, setTimeslot] = useState(null);
  const [sid, setSid] = useState(null);
  const [uid, setUid] = useState(null);
  const navigate = useNavigate();
  let { shoptype } = useParams();

  const bringSlots = (shopid) => {
    setDisplay("flex");
    setSid(shopid);
    axios
      .get(`http://localhost:8087/getTimeSlot?shopId=${shopid}`)
      .then((res) => {
        setTimeslot(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const book = (slotdetails, index) => {
    swal("Are you sure to book this slot?", {
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
          if(slotdetails.isTimeslotEnable === 'N'){
             return swal("Slot not Available","Kindly choose another slot","info")
          }
          else{
            axios
            .post("http://localhost:8085/bookingDetails", {
              userid: uid,
              shopid: sid,
              timeslot: slotdetails.timeslot,
            })
            .then((res) => {
              if (res.data.status === true) {
                swal("Booked slot Successfully!", "", "success").then(
                  (val) => {
                    
                  }
                );
                return setDisplay("none");
              }
            })
            .catch(err=>{
              swal("Something went wrong","","info")
              return setDisplay("none");  //these two lines are new
            })
          }
        // swal("Booked slot Successfully!", "", "success").then((val) => {});
        // return setDisplay("none");
        break;
        default:
          swal("Got away safely!", "", "success");
      }
    });
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8084/getShopDetailsByServiceType?serviceType=${shoptype}`
      )
      .then((res) => {
        let v = JSON.parse(localStorage.getItem("userInfo"));
        let u = v.userid;
        let pin = v.pincode;
        setUid(u);
        let found = res.data.data.filter(obj=>{
          return obj.pincode === pin
        })
        setshoplist(found);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, [shoptype]);

  //dashboard me jo state bna h waisa hi rendering of shops yaha hoga

  let slots = "";
  if (timeslot) {
    slots = timeslot.map((f, i) => {
      return (
        <ul key={i} className="list-group list-group-flush">
          <button
            style={{ boxShadow: "none" }}
            onClick={() => book(f, i)}
            className="list-group-item"
          >
            {f.timeslot}
          </button>
        </ul>
      );
    });
  }

  let shop = "";
  if (shoplist) {
    shop = shoplist.map((f) => {
      return (
        <div key={f.shopid} className="single-card">
          <div className="heading">
            <span style={{ textTransform: "Capitalize" }}>{f.shopname}</span>
          </div>
          <div className="line"></div>
          <div className="heading">
            <span>
              Address : {f.address} , Pin : {f.pincode}
            </span>
            <span>Contact : {f.contact}</span>
          </div>
          <div style={{ marginBottom: "0" }} className="heading">
            <button
              style={{
                textDecoration: "none",
                color: "white",
                padding: ".5rem 1.5rem",
                backgroundColor: "#73A9DF",
                borderRadius: ".5rem",
                transition: "all 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
              }}
              onClick={() => bringSlots(f.shopid)}
            >
              Book Slot
            </button>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="filteredshops">
      <Nav />
      <div style={{ display: display }} className="pop-up">
        <div className="pop-up-menu">
          <i
            onClick={() => setDisplay("none")}
            style={{ cursor: "pointer" }}
            className="ri-close-line"
          ></i>
          {slots === "" ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            slots
          )}
        </div>
      </div>
      <div className="filtered-shops-landing">
        <h1 className="m-5">
          {shoptype === "GS"
            ? "General Stores"
            : shoptype === "CL"
            ? "Clinics"
            : shoptype === "SL"
            ? "Salons"
            : "Tailors"}
        </h1>

        <div className="single-shops">{shop === "" ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            shop
          )}</div>
      </div>
      <div className='back-btn'>
      <span onClick={() => navigate(-1)}><i className="ri-arrow-left-fill"></i>Back</span>
      </div>
      <Footer />
    </div>
  );
}

export default Filteredshops;
