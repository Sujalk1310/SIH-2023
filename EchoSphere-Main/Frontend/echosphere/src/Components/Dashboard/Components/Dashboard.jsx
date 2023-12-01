import React from "react";
import "../public/Styles.css";
import DashboardUser from "./DashboardUser";
import DashboardSup from "./DashboardSup";
import DashboardAdmin from "./DashboardAdmin";

function Dashboard() {
  const user_id = localStorage.getItem('user_id');

  console.log('user_id:', user_id); // Debugging: Check the user_id
  console.log(parseInt(user_id));
  if (user_id === "15") {
    console.log('Rendering DashboardSuperUser');
    return <DashboardSup />; // Render nothing for user_id === "15"
  } else if (parseInt(user_id) > 15) {
    console.log('Rendering DashboardUser'); // Debugging: Check if DashboardUser should render
    return <DashboardUser />;
  } else if (user_id === null) {
    console.log('Redirecting to login'); // Debugging: Check if redirection is happening
    window.location.href = "/login"; // Redirect to login
    return null; // This line is added to avoid rendering anything when redirecting
  }
   else if (user_id){
    console.log('Rendering DashboardAdmin');
    return <DashboardAdmin />; // Render nothing for user_id < "15"
  }

  return <p>Loading...</p>;
}

export default Dashboard;
