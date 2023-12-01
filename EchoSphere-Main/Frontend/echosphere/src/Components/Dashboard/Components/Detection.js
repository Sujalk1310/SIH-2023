// Detection.js

import React from 'react';
import '../public/Lodge.css';
import { postDataToAPI } from '../../apiService';

const Detection = ({ onClose, text, responseMessage }) => {

  const add = () => {

    const json_data = {
      "priority": "NOR",
      "dept": responseMessage,
      "lat": 27,
      "long": 77,
      "location": "Ajhai Khurd",
      "summary": text
    }
    const id = localStorage.getItem("user_id");
    const url = `grievances/add/16`;
    const response = postDataToAPI(url, json_data);
    console.log('Response from axios:', response.message);
  }

  return (
    <div className="card card-detection text-center">
      <h2>We have detected...</h2>
      <div className="wider-form">
        <form>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select className="form-control" id="department" value={responseMessage}>
              <option>Electrical Department</option>
              <option>Fire Departement</option>
              <option>National Highways Authority of India (NHAI)</option>
              <option>Panchayat</option>
              <option>Nagar Palika (Municipal Corporation/Municipality)</option>
              <option>Law Enforcement Department</option>
              <option>Women and Child Development Department</option>
              <option>Labour Department</option>
              <option>Revenue Department</option>
              <option>Agriculture Department</option>
              <option>Transport Department</option>
              <option>Health Department</option>
              <option>Education Department</option>
              <option>Water Department</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="grievance">Grievance</label>
            <textarea
              className="form-control bg-light"
              id="grievance"
              rows="5"
              disabled>{text}</textarea>
          </div>
          <br></br>
          <button type="submit" onClick={add} className="btn btn-primary form-control text-light">
            Submit
          </button>
        </form>
      </div>
      <button className="btn btn-danger mt-3" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default Detection;
