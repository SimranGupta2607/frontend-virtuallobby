import React, { useEffect, useState } from "react";
import "./Filteredshops.css";
import { useParams } from "react-router-dom";
import Nav from "../Nav/Nav.js";
import Footer from "../Footer/Footer.js";
import axios from "axios";
import swal from "sweetalert";

function Filteredshops() {
  const [shoplist, setshoplist] = useState(null);
  const [display, setDisplay] = useState('none');
  let { shoptype } = useParams();

  const book = ()=>{
    swal("Are you sure to book this slot?",{
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
        swal("Booked slot Successfully!","","success").then((val)=>{
        });
        return setDisplay('none')
        default:
          swal("Got away safely!","","success")
      }
    })
  }

  useEffect(() => {
    axios
      .get(
        `http://localhost:8084/getShopDetailsByServiceType?serviceType=${shoptype}`
      )
      .then((res) => {
        setshoplist(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {};
  }, [shoptype]);

  //dashboard me jo state bna h waisa hi rendering of shops yaha hoga

  let shop = "";
  if (shoplist) {
    shop = shoplist.map((f) => {

      return (
        <div key={f.shopid} className="single-card">
          <div className="heading">
            <span style={{ textTransform: "Capitalize" }}>{f.shopname}</span>
            <span>Slots Available</span>
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
              onClick={() => setDisplay('flex')}
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
      <div style={{display:display}} className="pop-up">
        <div className="pop-up-menu">
          <i onClick={()=>setDisplay('none')} style={{cursor:'pointer'}} className="ri-close-line"></i>
            <ul className="list-group list-group-flush">
              <button style={{boxShadow: "none"}} onClick={book} className="list-group-item">10:00 - 10:30</button>
              <button style={{boxShadow: "none"}} onClick={book} className="list-group-item">11:00 - 11:30</button>
              <button style={{boxShadow: "none"}} onClick={book} className="list-group-item">12:00 - 12:30</button>
              <button style={{boxShadow: "none"}} onClick={book} className="list-group-item">13:00 - 13:30</button>
              <button style={{boxShadow: "none"}} onClick={book} className="list-group-item">15:00 - 15:30</button>
              <button style={{boxShadow: "none"}} onClick={book} className="list-group-item">16:00 - 16:30</button>
              <button style={{boxShadow: "none"}} onClick={book} className="list-group-item">17:00 - 17:30</button>
            </ul>
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

        <div className="single-shops">{shop}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Filteredshops;
