import React,{useState,useEffect} from 'react'
import Axios from "axios";
import { Link } from "react-router-dom";

function CustomerDashboard() {
    const [state, setstate] = useState(null);
    useEffect(() => {
      Axios.get("http://localhost:8083/getServiceDetails")
      .then(res=>{
        setstate(res.data.data)
      })
      .catch(err=>{
        console.log(err)
      })
      return () => {
      }
    }, [])
      let shop = "";
      if (state) {
        shop = state.map((f) => {
          return (
            <div key={f.serviceid} className="card" style={{ width: "18rem" }}>
              {/* <img src={f.path} className="card-img-top" alt="store" /> */}
              <div className="card-body">
                <p className="card-text">{f.servicename}</p>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "white",
                    padding: ".5rem 1.5rem",
                    backgroundColor: "#73A9DF",
                    borderRadius: ".5rem",
                    transition: "all 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
                  }}
                  to={`/dashboard/${f.servicetype}`}
                >
                  Explore
                </Link>
              </div>
            </div>
          );
        });
      }
    return (
  
      <div className="lower-landing">
        <h1 className="mt-5">Explore Shops Nearby</h1>
  
        <div className="shop-cards">{shop}</div>
      </div>
    );
}

export default CustomerDashboard