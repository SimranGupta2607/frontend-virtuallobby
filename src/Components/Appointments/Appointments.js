import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";
import { useParams } from "react-router-dom";
import './Appointments.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Appointments() {
  const [state, setstate] = useState(null);
  const navigate = useNavigate();
  let { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:8088/getbookingDetailsByUserId?userId=${id}`)
    .then(res=>{
      setstate(res.data.data)
    })
    .catch(err=>console.log(err))
    return () => {};
  }, []);
  let customer = "";
    if(state){
        customer = state.map(f=>{
            return(
                <div key={f.bookingid} className="single-card">
          <div className="heading">
            <span style={{ textTransform: "Capitalize" }}>{f.shopname}</span>
            <span style={{ textTransform: "Capitalize" }}>Time : {f.timeslot}</span>
          </div>
          <div className="line"></div>
          <div className="heading">
            <span>
             Shop Address : {f.address} , Shop Pin : {f.pincode}
            </span>
            <span>Shop Contact : {f.contact} </span>
          </div>
        </div>
            )
        })
    }
  return (
    <div>
      <Nav />
      <div className="lower-landing">
        <h1 className="mt-5">My Appointments for today!</h1>

        <div className="shop-cards">
          {customer===""?<div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>:customer}
        </div>
      <div className='back-btn'>
      <span onClick={() => navigate(-1)}><i className="ri-arrow-left-fill"></i>Back</span>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default Appointments;
