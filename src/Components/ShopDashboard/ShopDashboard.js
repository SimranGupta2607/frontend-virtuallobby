import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function ShopDashboard() {
  const [shopid, setShopid] = useState(null);
  const [state, setstate] = useState(null);
  useEffect(() => {
    let v = JSON.parse(localStorage.getItem("userInfo"));
    let sid = v.shopid;
    setShopid(sid);
      Axios.get(
        `http://localhost:8086/getbookingDetailsByShopId?shopId=14`
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
            console.log(f)
            return(
                <div key={f.bookingid} className="single-card">
          <div className="heading">
            <span style={{ textTransform: "Capitalize" }}>Aman Kumar</span>
            <span style={{ textTransform: "Capitalize" }}>Time : 10:00 a.m - 10:30 a.m</span>
          </div>
          <div className="line"></div>
          <div className="heading">
            <span>
              Address : house number - 8, IEL factory, Gumia , Pin : 829112
            </span>
            <span>Contact : 6206098865</span>
          </div>
        </div>
            )
        })
    }
  return (
    <div className="lower-landing">
      <h1 className="mt-5">New Appointments for today!</h1>

      <div className="shop-cards">{customer}</div>
    </div>
  );
}

export default ShopDashboard;
