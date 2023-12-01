import React, { useEffect, useState } from "react";
import Table from "./Table";
import Header from "./Header";
import Link from "./Links";
import Cards from "./Cards";
import Footer from "./Footer";
import { fetchDataFromAPI } from "../../apiService";
import TrackingApp from './TrackingApp';

const DashboardUser = () => {
  const [jsonData, setJsonData] = useState(null);
  const [activeCount, setActiveCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [data, SetData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const id = localStorage.getItem('user_id');
  const url = `grievances/u${id}`;
  const name = `User ${id}`;
  
  useEffect(() => {
    fetchDataFromAPI(url)
      .then(json => {
        // Handle the response data
        console.log('Data fetched:', json.message);
        setJsonData(json.message);

        // Count "completed," "active," and total counts here
        let ccount = 0;
        let acount = 0;
        json.message.forEach(jsonObj => {
          if (jsonObj.status === "Completed") {
            ccount++;
          } else if (jsonObj.status === "Active") {
            acount++;
          }
        });
        setActiveCount(acount);
        setCompletedCount(ccount);
        setTotalCount(json.message.length);
        SetData(json.message[0]);

        // Set loading to false when data is loaded
        setLoading(false);
      })
      .catch(error => {
        // Handle any errors
        console.error('Error fetching data:', error);
        // Set loading to false in case of an error
        setLoading(false);
      });
  }, [url]);

  const c1 = activeCount;
  const c2 = completedCount;
  const c3 = totalCount;

  return (
    <div className="App">
      <Header />
      {loading ? ( // Conditionally render based on loading state
        <p>Loading...</p>
      ) : (
        <div>
          <Link user={name} />
          <Cards c1={c1} c2={c2} c3={c3} />
          <TrackingApp data={data} />
          <Table data={jsonData} />
        </div>
      )}
      <Footer c1={c1} c2={c2} c3={c3} />
    </div>
  );
}

export default DashboardUser;
