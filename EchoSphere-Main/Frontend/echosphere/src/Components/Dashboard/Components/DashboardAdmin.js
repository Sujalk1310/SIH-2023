import React, { useEffect, useState } from "react";
import Table from "./Table";
import Header from "./Header";
import Link from "./Links";
import Cards from "./Cards";
import Footer from "./Footer";
import { fetchDataFromAPI } from "../../apiService";

const DashboardUser = () => {
  const [jsonData, setJsonData] = useState(null);
  const [activeCount, setActiveCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const id = localStorage.getItem('user_id');
  const url = `grievances/u3`;
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
      })
      .catch(error => {
        // Handle any errors
        console.error('Error fetching data:', error);
      });
  }, [url]);

  const name = `Admin ${id}`;
  const c1 = activeCount;
  const c2 = completedCount;
  const c3 = totalCount;

  return (
    <div className="App">
      <Header />
      <div>
        <Link user={name} filter="adm"/>
        <Cards c1={c1} c2={c2} c3={c3} />
        <Table data={jsonData}/>
      </div>
      <Footer c1={c1} c2={c2} c3={c3} />
    </div>
  );
}

export default DashboardUser;
