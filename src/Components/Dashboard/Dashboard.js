import React, { useState,useEffect } from "react";
import "./Dashboard.css";
import Footer from "../Footer/Footer.js";
import Nav from "../Nav/Nav.js";
import ShopDashboard from '../ShopDashboard/ShopDashboard'
import CustomerDashboard from '../CustomerDashboard/CustomerDashboard'
import { useNavigate } from 'react-router-dom';


function Dashboard() {
  const [state, setstate] = useState('')
  const [name,setName] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    let v = JSON.parse(localStorage.getItem('userInfo'))
    let utype = v.utype;
    let uname = v.username
    setstate(utype)
    setName(uname)
    return () => {
    }
  }, [])
  
  return (
    <div className="dashboard-parent">
      <Nav/>
      {state === 'U'? <CustomerDashboard username = {name} /> : <ShopDashboard/>}
      <div className='back-btn'>
      <span onClick={() => navigate(-1)}><i className="ri-arrow-left-fill"></i>Back</span>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
