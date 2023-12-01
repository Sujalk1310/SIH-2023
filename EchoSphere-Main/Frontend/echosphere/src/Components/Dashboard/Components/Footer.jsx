import React from 'react';
import img01 from "../imgs/quiz-mygov.png";
import img02 from "../imgs/transforming-india.png";
import img03 from "../imgs/mygov-innovation.png";
import img04 from "../imgs/pledge.png";
import img05 from "../imgs/mygov-blog.png";
import img06 from "../imgs/swachh-bharat.png";
import "../public/Styles.css";


function Footer(props) {
  return (
    <footer className="text-center text-white" style={{ backgroundColor: 'orange' }}>
    <div className="container">
      <section className="mt-5">
        <div className="row  d-flex justify-content-center pt-3">
            <div className="conss">
                <div className="three">
                    <div className="col-md-12">
                        <h6 className=" font-weight-bold">
                            <div className='upp-links'>
                                <img src={img01} alt="1" height="30px" width="50px"/>
                                <a href="/dashboard" className="text-black">&nbsp; MyGov Quiz</a>
                            </div>
                        </h6>
                    </div>
                    <div className="col-md-12">
                        <h6 className="font-weight-bold">
                            <div className='upp-links'>
                                <img src={img02} alt="2" height="20px" width="30px"/>
                                <a href="/dashboard" className="text-black"> &nbsp; Transforming India</a>
                            </div>
                        </h6>
                    </div>
                    <div className="col-md-12">
                        <h6 className=" font-weight-bold">
                            <div className='upp-links'>
                                <img src={img03} alt="3" height="30px" width="30px"/>
                                <a href="/dashboard" className="text-black">&nbsp; MyGov Innovation</a>
                            </div>
                        </h6>
                    </div>
                </div>
                <section className="text-center mb-4 secs">
                    <a href="/dashboard" className="text-white me-4 secs-a">
                    <i className="fab fa-facebook-f fa-2x"></i>
                    </a>
                    <a href="/dashboard" className="text-white me-4">
                    <i className="fab fa-twitter fa-2x"></i>
                    </a>
                    <a href="/dashboard" className="text-white me-4">
                    <i className="fab fa-google fa-2x"></i>
                    </a>
                    <a href="/dashboard" className="text-white me-4">
                    <i className="fab fa-instagram fa-2x"></i>
                    </a>
                    <a href="/dashboard" className="text-white me-4">
                    <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                </section>
                <div className="four">
                    <div className="col-md-12">
                        <h6 className=" font-weight-bold">
                            <div className='upp-links'>
                                <img src={img04} alt="4" height="30px" width="30px"/>
                                <a href="/dashboard" className="text-black"> &nbsp; MyGov Pledge</a>
                            </div>
                        </h6>
                    </div>
                    <div className="col-md-12">
                        <h6 className=" font-weight-bold">
                            <div className='upp-links'>
                                <img src={img05} alt="5" height="30px" width="50px"/>
                                <a href="/dashboard" className="text-black">&nbsp; MyGov Blog</a>
                            </div>
                        </h6>
                    </div>
                    <div className="col-md-12">
                        <h6 className=" font-weight-bold">
                            <div className='upp-links'>
                                <img src={img06} alt="6" height="30px" width="50px"/>
                                <a href="/dashboard" className="text-black">&nbsp; Swachh Bharat</a>
                            </div>
                        </h6>
                    </div>
                </div>  
            </div>    
        </div>
      </section>
      <hr className="my-5" />
      <section className="mb-0">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-12">
            <p>
                &#x2022;Public Grievanace Redressal System &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &#x2022;Interactive User-Friendly Interface &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &#x2022;Redirection to Connected Authority  
            </p><br/><br/>
          </div>
        </div>
      </section>
    </div>
    <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>© 2023 Copyright<p className="text-white" href="/dashboard">EchoSphere</p>
    </div>
    <div className="lasts">
        <marquee className="resulttMarquee" width="100%" id="gfg"> {props.c1} Active Complaints || {props.c2} Completed Complaints  || {props.c3} total Registered Complaints </marquee>
    </div>
  </footer>
  );
}

export default Footer;
