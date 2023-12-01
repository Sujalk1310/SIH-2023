import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { fetchDataFromAPI, postDataToAPI, putDataToAPI } from './apiService';

const Dashboard = () => {
  // const [id, setId] = useState(null);

  const logout = () => {
    alert("Sure");
    localStorage.removeItem('user_id');
    window.location.href="/login";
  };

  if (localStorage.getItem('user_id') > 0) { 
    return (
      <div>
        {/* Your Dashboard content here */}
        <h1>Welcome to the Dashboard</h1>
        {/* Add your Dashboard content */}
        <button onClick={logout}>Log Out</button>
      </div>
    );
  } else {
    window.location.href="/login";
  }
  return <p>Loading...</p>;
};

export default Dashboard;
