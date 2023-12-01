import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import StatusTracks from './StatusTracks';
import { fetchDataFromAPI } from '../../apiService';
import Header from './Header';
import Footer from './Footer';

const Status = () => {
    const [jsonData, setJsonData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeCount, setActiveCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
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
  if (loading) {
    return <div> Loading... </div>;
  }
    return (
        <div className="App">
        <Header />
        <Link user={name} filter="usr" but="status"/>
        <div>
            <StatusTracks jsonData={jsonData} />
        </div>
        <Footer c1={c1} c2={c2} c3={c3} />
        </div>
    )
}

export default Status;