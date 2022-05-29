import React, { useState,useEffect } from "react";
import "./Dashboard.css";
import Footer from "../Footer/Footer.js";
import Nav from "../Nav/Nav.js";
import ShopDashboard from '../ShopDashboard/ShopDashboard'
import CustomerDashboard from '../CustomerDashboard/CustomerDashboard'


function Dashboard() {
  const [state, setstate] = useState('')
  useEffect(() => {
    let v = JSON.parse(localStorage.getItem('userInfo'))
    let utype = v.utype;
    setstate(utype)
  
    return () => {
    }
  }, [])
  
  return (
    <div className="dashboard-parent">
      <Nav/>
      {state === 'U'? <CustomerDashboard/> : <ShopDashboard/>}
      <Footer />
    </div>
  );
}

export default Dashboard;
