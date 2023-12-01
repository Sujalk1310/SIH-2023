import React from "react";
import '../public/Styles.css';
import CountUp from 'react-countup';

function Cards(props){
    return(
        <>
        <div className="cardss">
            <div className="col-xl-3 col-sm-6 col-12">
                <div className="card">
                <div className="card-content">
                    <div className="card-body">
                    <div className="media d-flex">
                        <div className="align-self-center">
                        <i className="icon-speech warning font-large-2 float-left"></i>
                        </div>
                        <div className="media-body text-right">
                        <h1><CountUp end={props.c1} /></h1>
                        <span>ACTIVE COMPLAINTS</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
                <div className="card">
                <div className="card-content">
                    <div className="card-body">
                    <div className="media d-flex">
                        <div className="align-self-center">
                        <i className="icon-speech warning font-large-2 float-left"></i>
                        </div>
                        <div className="media-body text-right">
                        <h1><CountUp end={props.c2} /></h1>
                        <span>COMPLETED COMPLAINTS</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12">
                <div className="card">
                <div className="card-content">
                    <div className="card-body">
                    <div className="media d-flex">
                        <div className="align-self-center">
                        <i className="icon-speech warning font-large-2 float-left"></i>
                        </div>
                        <div className="media-body text-right">
                        <h1><CountUp end={props.c3} /></h1>
                        <span>TOTAL COMPLAINTS</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    );
}
export default Cards;