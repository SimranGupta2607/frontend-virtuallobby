import React, { useState, useEffect } from "react";
import Axios from "axios";

function ShopDashboard() {
  const [shopid, setShopid] = useState(null);
  const [state, setstate] = useState(null);
  useEffect(() => {
    let v = JSON.parse(localStorage.getItem("userInfo"));
    let sid = v.shopid;
    setShopid(sid);
      Axios.get(
        `http://localhost:8086/getbookingDetailsByShopId?shopId=${sid}`
      )
        .then((res) => {
          setstate(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
        return () => {};
    }, []);
    let customer = "";
    if(state){
        customer = state.map(f=>{
            return(
                <div key={f.bookingid} className="single-card">
          <div className="heading">
            <span style={{ textTransform: "Capitalize" }}>{f.username}</span>
            <span style={{ textTransform: "Capitalize" }}>Time : {f.timeslot} </span>
          </div>
          <div className="line"></div>
          <div className="heading">
            <span>
              Address : {f.address} , Pin : {f.pincode}
            </span>
            <span>Contact : {f.contact} </span>
          </div>
        </div>
            )
        })
    }
  return (
    <div className="lower-landing">
      <h1 className="mt-5">New Appointments for today!</h1>

      <div className="shop-cards">{customer===""?<div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>:customer}</div>
    </div>
  );
}

export default ShopDashboard;
