import React from "react";
import img01 from "../imgs/lion2.png";
import img02 from "../imgs/sih.png";
import '../public/Styles.css'

function Header() {
  return (
    <div>
      <div className="navi">
        <div className="ad">
            <img src={img01} alt="1" height="70px" width="50px"/>
        </div>
        <div className="headingg">
            <h1 text-align="center"><b>NATIONAL GRIEVANCE PORTAL</b></h1>
        </div>
        <img src={img02} alt="2" height="80px"/>
      </div>

      <div className="header02"><h1 className="pt-4 text-white font-weight-bold">Welcome to EchoSphere Grievances Redressal System</h1></div>

    </div>
  );
}

export default Header;
